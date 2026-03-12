import type { Funcionario } from "../../types/funcionario"
import { EmployeeCard } from "./employee-card"

interface DepartmentSectionProps {
  title: string
  funcionarios: Funcionario[]
  collapsed: boolean
  onToggle: () => void
  onEmployeeClick?: (funcionario: Funcionario) => void
}

export function DepartmentSection({
  title,
  funcionarios,
  collapsed,
  onToggle,
  onEmployeeClick,
}: DepartmentSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            {collapsed ? "Expandir" : "Recolher"}
          </button>

          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>

        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          {funcionarios.length} colaborador{funcionarios.length !== 1 ? "es" : ""}
        </span>
      </div>

      {!collapsed ? (
        funcionarios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-500">
            Nenhum funcionário neste grupo.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {funcionarios.map((funcionario) => (
              <EmployeeCard
                key={funcionario.id}
                funcionario={funcionario}
                onClick={onEmployeeClick}
              />
            ))}
          </div>
        )
      ) : null}
    </section>
  )
}