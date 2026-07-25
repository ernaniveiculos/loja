"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { mensagemSchema } from "@/lib/validations/mensagem";

export async function enviarMensagem(veiculoId: string | null, formData: FormData) {
  const parsed = mensagemSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone") || undefined,
    mensagem: formData.get("mensagem"),
  });
  if (!parsed.success) {
    return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("mensagens").insert({
    veiculo_id: veiculoId,
    ...parsed.data,
  });
  if (error) return { erro: error.message };

  if (veiculoId) revalidatePath("/painel/vendedor/mensagens");
  revalidatePath("/painel/admin/mensagens");
  return { erro: null };
}

export async function listarMensagensDoVendedor() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mensagens")
    .select("*, veiculos(nome, marca, modelo, vendedor_id)")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function marcarMensagemRespondida(id: string, respondida: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("mensagens").update({ respondida }).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath("/painel/vendedor/mensagens");
  revalidatePath("/painel/admin/mensagens");
  return { erro: null };
}
