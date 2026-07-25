import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const cadastroSchema = z
  .object({
    nome: z.string().min(2, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    telefone: z.string().optional(),
    tipo: z.enum(["cliente", "vendedor"]).default("cliente"),
    senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });
export type CadastroInput = z.infer<typeof cadastroSchema>;

export const recuperarSenhaSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
});
export type RecuperarSenhaInput = z.infer<typeof recuperarSenhaSchema>;

export const redefinirSenhaSchema = z
  .object({
    senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });
export type RedefinirSenhaInput = z.infer<typeof redefinirSenhaSchema>;
