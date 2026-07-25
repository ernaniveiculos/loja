export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agendamentos: {
        Row: {
          criado_em: string
          data: string
          horario: string
          id: string
          observacoes: string | null
          status: string
          usuario_id: string | null
          veiculo_id: string
        }
        Insert: {
          criado_em?: string
          data: string
          horario: string
          id?: string
          observacoes?: string | null
          status?: string
          usuario_id?: string | null
          veiculo_id: string
        }
        Update: {
          criado_em?: string
          data?: string
          horario?: string
          id?: string
          observacoes?: string | null
          status?: string
          usuario_id?: string | null
          veiculo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos: {
        Row: {
          criado_em: string
          id: string
          usuario_id: string
          veiculo_id: string
        }
        Insert: {
          criado_em?: string
          id?: string
          usuario_id: string
          veiculo_id: string
        }
        Update: {
          criado_em?: string
          id?: string
          usuario_id?: string
          veiculo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      imagens_veiculos: {
        Row: {
          criado_em: string
          id: string
          ordem: number
          url_imagem: string
          veiculo_id: string
        }
        Insert: {
          criado_em?: string
          id?: string
          ordem?: number
          url_imagem: string
          veiculo_id: string
        }
        Update: {
          criado_em?: string
          id?: string
          ordem?: number
          url_imagem?: string
          veiculo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "imagens_veiculos_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      mensagens: {
        Row: {
          criado_em: string
          email: string
          id: string
          mensagem: string
          nome: string
          respondida: boolean
          telefone: string | null
          veiculo_id: string | null
        }
        Insert: {
          criado_em?: string
          email: string
          id?: string
          mensagem: string
          nome: string
          respondida?: boolean
          telefone?: string | null
          veiculo_id?: string | null
        }
        Update: {
          criado_em?: string
          email?: string
          id?: string
          mensagem?: string
          nome?: string
          respondida?: boolean
          telefone?: string | null
          veiculo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes: {
        Row: {
          criado_em: string
          descricao: string | null
          id: string
          lida: boolean
          titulo: string
          usuario_id: string
        }
        Insert: {
          criado_em?: string
          descricao?: string | null
          id?: string
          lida?: boolean
          titulo: string
          usuario_id: string
        }
        Update: {
          criado_em?: string
          descricao?: string | null
          id?: string
          lida?: boolean
          titulo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          criado_em: string
          email: string
          foto: string | null
          id: string
          nome: string
          telefone: string | null
          tipo: string
        }
        Insert: {
          criado_em?: string
          email: string
          foto?: string | null
          id: string
          nome: string
          telefone?: string | null
          tipo?: string
        }
        Update: {
          criado_em?: string
          email?: string
          foto?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          tipo?: string
        }
        Relationships: []
      }
      veiculos: {
        Row: {
          ano: number | null
          ativo: boolean
          atualizado_em: string
          cambio: string | null
          cidade: string | null
          combustivel: string | null
          cor: string | null
          criado_em: string
          descricao: string | null
          destaque: boolean
          estado: string | null
          id: string
          marca: string
          modelo: string
          nome: string | null
          placa: string | null
          preco: number | null
          quilometragem: number | null
          telefone: string | null
          vendedor_id: string | null
          vendido: boolean
        }
        Insert: {
          ano?: number | null
          ativo?: boolean
          atualizado_em?: string
          cambio?: string | null
          cidade?: string | null
          combustivel?: string | null
          cor?: string | null
          criado_em?: string
          descricao?: string | null
          destaque?: boolean
          estado?: string | null
          id?: string
          marca: string
          modelo: string
          nome?: string | null
          placa?: string | null
          preco?: number | null
          quilometragem?: number | null
          telefone?: string | null
          vendedor_id?: string | null
          vendido?: boolean
        }
        Update: {
          ano?: number | null
          ativo?: boolean
          atualizado_em?: string
          cambio?: string | null
          cidade?: string | null
          combustivel?: string | null
          cor?: string | null
          criado_em?: string
          descricao?: string | null
          destaque?: boolean
          estado?: string | null
          id?: string
          marca?: string
          modelo?: string
          nome?: string | null
          placa?: string | null
          preco?: number | null
          quilometragem?: number | null
          telefone?: string | null
          vendedor_id?: string | null
          vendido?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "veiculos_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_dono_veiculo: { Args: { v_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database["public"]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]
