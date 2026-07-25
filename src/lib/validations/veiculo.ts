import { z } from "zod";

export const veiculoSchema = z.object({
  nome: z.string().min(2, "Informe um título para o anúncio"),
  marca: z.string().min(1, "Informe a marca"),
  modelo: z.string().min(1, "Informe o modelo"),
  ano: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 1),
  preco: z.coerce.number().min(0, "Informe um preço válido"),
  cor: z.string().optional(),
  placa: z.string().optional(),
  quilometragem: z.coerce.number().int().min(0).optional(),
  combustivel: z.string().optional(),
  cambio: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  telefone: z.string().optional(),
  descricao: z.string().optional(),
  ativo: z.boolean().default(true),
  destaque: z.boolean().default(false),
  vendido: z.boolean().default(false),
});
export type VeiculoInput = z.infer<typeof veiculoSchema>;

export const filtroVeiculosSchema = z.object({
  q: z.string().optional(),
  marca: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  combustivel: z.string().optional(),
  cambio: z.string().optional(),
  precoMin: z.coerce.number().optional(),
  precoMax: z.coerce.number().optional(),
  anoMin: z.coerce.number().optional(),
  anoMax: z.coerce.number().optional(),
  ordenar: z.enum(["recentes", "menor_preco", "maior_preco", "menor_km"]).optional(),
});
export type FiltroVeiculos = z.infer<typeof filtroVeiculosSchema>;
