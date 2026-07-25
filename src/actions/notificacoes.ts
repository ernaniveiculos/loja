"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function listarNotificacoes() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("notificacoes")
    .select("*")
    .eq("usuario_id", user.id)
    .order("criado_em", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}

export async function marcarNotificacaoLida(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notificacoes").update({ lida: true }).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath("/painel");
  return { erro: null };
}

export async function criarNotificacao(usuarioId: string, titulo: string, descricao?: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notificacoes").insert({ usuario_id: usuarioId, titulo, descricao });
  if (error) return { erro: error.message };
  return { erro: null };
}

export async function listarTodasNotificacoes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notificacoes")
    .select("*, usuarios(nome, email)")
    .order("criado_em", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data;
}
