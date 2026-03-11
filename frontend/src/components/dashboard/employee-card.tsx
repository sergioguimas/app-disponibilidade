import type { Funcionario } from "../../types/funcionario"
import { StatusBadge } from "./status-badge"

interface EmployeeCardProps {
  funcionario: Funcionario
  onClick?: (funcionario: Funcionario) => void
}

export function EmployeeCard({ funcionario, onClick }: EmployeeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(funcionario)}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-left transition hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{funcionario.nome}</h3>
          <p className="mt-1 text-sm text-zinc-400">{funcionario.identificacao}</p>
        </div>

        <StatusBadge status={funcionario.status} />
      </div>

      {funcionario.departamento ? (
        <p className="mt-4 text-sm text-zinc-300">
          Departamento: <span className="text-zinc-100">{funcionario.departamento}</span>
        </p>
      ) : null}

      {funcionario.observacao ? (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{funcionario.observacao}</p>
      ) : null}
    </button>
  )
}