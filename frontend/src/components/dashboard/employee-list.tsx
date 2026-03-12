import type { Funcionario } from "../../types/funcionario"
import { StatusBadge } from "./status-badge"

interface EmployeeListItemProps {
  funcionario: Funcionario
  onClick?: (funcionario: Funcionario) => void
}

function formatarData(data?: string | null) {
  if (!data) return "Sem atualização"
  return new Date(data).toLocaleString("pt-BR")
}

export function EmployeeListItem({
  funcionario,
  onClick,
}: EmployeeListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(funcionario)}
      className="grid w-full grid-cols-1 gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-left transition hover:border-zinc-700 hover:bg-zinc-900 md:grid-cols-[minmax(220px,1.4fr)_120px_minmax(220px,1fr)_180px]"
    >
        <div className="grid grid-cols-3 items-center">
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{funcionario.nome}</p>
            </div>

            <div className="flex justify-start">
                <StatusBadge status={funcionario.status_atual} />
            </div>

            <div>
                <p className="text-xs text-zinc-500">Atualizado em</p>
                <p className="text-sm text-zinc-300">
                {formatarData(funcionario.status_atual_em)}
                </p>
            </div>
        </div>
    </button>
  )
}