export type Status = 'available'| 'busy'| 'coffee'| 'lunch'| 'offline'

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
  status_atual?: Status | null
  status_atual_em?: string | null
  observacao?: string | null
}