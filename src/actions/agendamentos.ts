"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { agendamentoSchema } from "@/lib/validations/agendamento";

export async function criarAgendamento(veiculoId: string, formData: FormData) {
  const parsed = agendamentoSchema.safeParse({
    data: formData.get("data"),
    horario: formData.get("horario"),
    observacoes: formData.get("observacoes") || undefined,
  });
  if (!parsed.success) {
    return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { erro: "Faça login para agendar uma visita" };

  const { error } = await supabase.from("agendamentos").insert({
    veiculo_id: veiculoId,
    usuario_id: user.id,
    ...parsed.data,
  });
  if (error) return { erro: error.message };

  revalidatePath("/painel/vendedor/agendamentos");
  revalidatePath("/painel/admin/agendamentos");
  return { erro: null };
}

export async function listarAgendamentos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*, veiculos(nome, marca, modelo, vendedor_id), usuarios(nome, email, telefone)")
    .order("data", { ascending: true });
  if (error) throw error;
  return data;
}

export async function atualizarStatusAgendamento(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("agendamentos").update({ status }).eq("id", id);
  if (error) return { erro: error.message };
  revalidatePath("/painel/vendedor/agendamentos");
  revalidatePath("/painel/admin/agendamentos");
  return { erro: null };
}
