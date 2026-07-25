import { z } from "zod";

export const mensagemSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("Informe um e-mail válido"),
  telefone: z.string().optional(),
  mensagem: z.string().min(5, "Escreva uma mensagem"),
});
export type MensagemInput = z.infer<typeof mensagemSchema>;
