"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function alternarFavorito(veiculoId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { erro: "Faça login para favoritar", favoritado: false };

  const { data: existente } = await supabase
    .from("favoritos")
    .select("id")
    .eq("usuario_id", user.id)
    .eq("veiculo_id", veiculoId)
    .maybeSingle();

  if (existente) {
    await supabase.from("favoritos").delete().eq("id", existente.id);
    revalidatePath("/favoritos");
    return { erro: null, favoritado: false };
  }

  await supabase.from("favoritos").insert({ usuario_id: user.id, veiculo_id: veiculoId });
  revalidatePath("/favoritos");
  return { erro: null, favoritado: true };
}

export async function listarFavoritos() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("favoritos")
    .select("id, veiculo_id, veiculos(*, imagens_veiculos(*))")
    .eq("usuario_id", user.id)
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function ehFavorito(veiculoId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("favoritos")
    .select("id")
    .eq("usuario_id", user.id)
    .eq("veiculo_id", veiculoId)
    .maybeSingle();
  return !!data;
}
