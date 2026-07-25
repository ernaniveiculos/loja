"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, cadastroSchema, recuperarSenhaSchema, redefinirSenhaSchema } from "@/lib/validations/auth";

export async function entrar(formData: FormData) {
  const dados = loginSchema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  });
  if (!dados.success) {
    return { erro: dados.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: dados.data.email,
    password: dados.data.senha,
  });

  if (error) {
    return { erro: "E-mail ou senha inválidos" };
  }

  revalidatePath("/", "layout");
  return { erro: null };
}

export async function cadastrar(formData: FormData) {
  const dados = cadastroSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone") || undefined,
    tipo: formData.get("tipo") || "cliente",
    senha: formData.get("senha"),
    confirmarSenha: formData.get("confirmarSenha"),
  });
  if (!dados.success) {
    return { erro: dados.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: dados.data.email,
    password: dados.data.senha,
    options: {
      data: { nome: dados.data.nome, tipo: dados.data.tipo },
    },
  });

  if (error) {
    return { erro: error.message };
  }

  return { erro: null };
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function solicitarRecuperacaoSenha(formData: FormData) {
  const dados = recuperarSenhaSchema.safeParse({ email: formData.get("email") });
  if (!dados.success) {
    return { erro: dados.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(dados.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/redefinir-senha`,
  });

  if (error) {
    return { erro: error.message };
  }
  return { erro: null };
}

export async function redefinirSenha(formData: FormData) {
  const dados = redefinirSenhaSchema.safeParse({
    senha: formData.get("senha"),
    confirmarSenha: formData.get("confirmarSenha"),
  });
  if (!dados.success) {
    return { erro: dados.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: dados.data.senha });
  if (error) {
    return { erro: error.message };
  }
  return { erro: null };
}

export async function obterUsuarioAtual() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfil } = await supabase.from("usuarios").select("*").eq("id", user.id).single();
  return perfil;
}
