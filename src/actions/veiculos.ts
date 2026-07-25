"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { veiculoSchema } from "@/lib/validations/veiculo";
import type { FiltroVeiculos } from "@/lib/validations/veiculo";
import type { TablesInsert } from "@/lib/types/database";

export async function listarVeiculos(filtros: FiltroVeiculos = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("veiculos")
    .select("*, imagens_veiculos(*)")
    .eq("ativo", true)
    .eq("vendido", false);

  if (filtros.q) {
    query = query.or(
      `nome.ilike.%${filtros.q}%,marca.ilike.%${filtros.q}%,modelo.ilike.%${filtros.q}%`
    );
  }
  if (filtros.marca) query = query.ilike("marca", filtros.marca);
  if (filtros.cidade) query = query.ilike("cidade", filtros.cidade);
  if (filtros.estado) query = query.ilike("estado", filtros.estado);
  if (filtros.combustivel) query = query.eq("combustivel", filtros.combustivel);
  if (filtros.cambio) query = query.eq("cambio", filtros.cambio);
  if (filtros.precoMin) query = query.gte("preco", filtros.precoMin);
  if (filtros.precoMax) query = query.lte("preco", filtros.precoMax);
  if (filtros.anoMin) query = query.gte("ano", filtros.anoMin);
  if (filtros.anoMax) query = query.lte("ano", filtros.anoMax);

  switch (filtros.ordenar) {
    case "menor_preco":
      query = query.order("preco", { ascending: true });
      break;
    case "maior_preco":
      query = query.order("preco", { ascending: false });
      break;
    case "menor_km":
      query = query.order("quilometragem", { ascending: true });
      break;
    default:
      query = query.order("criado_em", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function listarDestaques() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select("*, imagens_veiculos(*)")
    .eq("ativo", true)
    .eq("vendido", false)
    .eq("destaque", true)
    .order("criado_em", { ascending: false })
    .limit(8);
  if (error) throw error;
  return data;
}

export async function obterVeiculo(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select("*, imagens_veiculos(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function listarMeusVeiculos() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("veiculos")
    .select("*, imagens_veiculos(*)")
    .eq("vendedor_id", user.id)
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function criarVeiculo(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { erro: "Você precisa estar autenticado" };

  const bruto = Object.fromEntries(formData.entries());
  const parsed = veiculoSchema.safeParse({
    ...bruto,
    ativo: bruto.ativo === "on" || bruto.ativo === "true",
    destaque: bruto.destaque === "on" || bruto.destaque === "true",
    vendido: bruto.vendido === "on" || bruto.vendido === "true",
  });
  if (!parsed.success) {
    return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const insercao: TablesInsert<"veiculos"> = { ...parsed.data, vendedor_id: user.id };
  const { data, error } = await supabase.from("veiculos").insert(insercao).select().single();
  if (error) return { erro: error.message };

  revalidatePath("/painel/vendedor");
  revalidatePath("/");
  return { erro: null, veiculo: data };
}

export async function atualizarVeiculo(id: string, formData: FormData) {
  const supabase = await createClient();
  const bruto = Object.fromEntries(formData.entries());
  const parsed = veiculoSchema.safeParse({
    ...bruto,
    ativo: bruto.ativo === "on" || bruto.ativo === "true",
    destaque: bruto.destaque === "on" || bruto.destaque === "true",
    vendido: bruto.vendido === "on" || bruto.vendido === "true",
  });
  if (!parsed.success) {
    return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const { error } = await supabase
    .from("veiculos")
    .update({ ...parsed.data, atualizado_em: new Date().toISOString() })
    .eq("id", id);
  if (error) return { erro: error.message };

  revalidatePath("/painel/vendedor");
  revalidatePath(`/veiculos/${id}`);
  revalidatePath("/");
  return { erro: null };
}

export async function excluirVeiculo(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("veiculos").delete().eq("id", id);
  if (error) return { erro: error.message };

  revalidatePath("/painel/vendedor");
  revalidatePath("/");
  return { erro: null };
}
