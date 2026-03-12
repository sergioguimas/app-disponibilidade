import type { Status } from "../../types/funcionario"

export function getStatusLabel(status?: Status | null) {
  switch (status) {
    case "available":
      return "Disponível"
    case "busy":
      return "Ocupado"
    case "break":
      return "Em pausa"
    default:
      return status
  }
}

export function getStatusClasses(status: Status | null) {
  switch (status) {
    case "available":
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
    case "busy":
      return "bg-rose-500/15 text-rose-400 border border-rose-500/30"
    case "break":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/30"
    default:
      return "bg-zinc-500/15 text-zinc-300 border border-zinc-500/30"
  }
}