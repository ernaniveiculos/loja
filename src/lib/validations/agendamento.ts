import { z } from "zod";

export const agendamentoSchema = z.object({
  data: z.string().min(1, "Escolha uma data"),
  horario: z.string().min(1, "Escolha um horário"),
  observacoes: z.string().optional(),
});
export type AgendamentoInput = z.infer<typeof agendamentoSchema>;
