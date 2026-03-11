export type Status = "available" | "busy" | "break"

export interface HistoricoStatus {
  id: string
  status: Status
  observacao?: string | null
  created_at: string
}

export interface Funcionario {
  id: string
  nome: string
  identificacao: string
  departamento?: string | null
  status: Status
  observacao?: string | null
  updated_at?: string
  historico?: HistoricoStatus[]
}