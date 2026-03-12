import type { Funcionario } from "../../types/funcionario"
import { StatusBadge } from "./status-badge"

interface EmployeeCardProps {
  funcionario: Funcionario
  onClick?: (funcionario: Funcionario) => void
}

function formatarData(data?: string | null) {
  if (!data) return "Sem atualização"

  return new Date(data).toLocaleString("pt-BR")
}

export function EmployeeCard({ funcionario, onClick }: EmployeeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(funcionario)}
      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-left transition hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">
            {funcionario.nome}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{funcionario.identificacao}</p>
        </div>

        <div className="shrink-0">
          <StatusBadge status={funcionario.status_atual} />
        </div>
      </div>

      <div className="mt-4 space-y-1.5 text-sm">
        <p className="text-zinc-300">
          <span className="text-zinc-500">Depto:</span>{" "}
          <span className="font-medium text-zinc-100">
            {funcionario.departamento || "Sem departamento"}
          </span>
        </p>

        <p className="text-zinc-400">
          <span className="text-zinc-500">Atualizado:</span>{" "}
          {formatarData(funcionario.status_atual_em)}
        </p>
      </div>
    </button>
  )
}