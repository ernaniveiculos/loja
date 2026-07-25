import type { Tables } from "./database";

export type Veiculo = Tables<"veiculos">;
export type Usuario = Tables<"usuarios">;
export type ImagemVeiculo = Tables<"imagens_veiculos">;
export type Favorito = Tables<"favoritos">;
export type Mensagem = Tables<"mensagens">;
export type Agendamento = Tables<"agendamentos">;
export type Notificacao = Tables<"notificacoes">;

export type VeiculoComImagens = Veiculo & {
  imagens_veiculos: ImagemVeiculo[];
};

export type TipoUsuario = "administrador" | "vendedor" | "cliente";
export type StatusAgendamento = "pendente" | "confirmado" | "cancelado" | "concluido";
