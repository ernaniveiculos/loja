"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function listarUsuarios() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("usuarios").select("*").order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function atualizarTipoUsuario(id: string, tipo: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("usuarios").update({ tipo }).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath("/painel/admin/usuarios");
  return { erro: null };
}
