import type { Funcionario } from "../../types/funcionario"
import { EmployeeCard } from "./employee-card"
import { EmployeeListItem } from "./employee-list"

export type ViewMode = "cards" | "list" | "collapsed"

interface DepartmentSectionProps {
  title: string
  funcionarios: Funcionario[]
  collapsed: boolean
  viewMode: ViewMode
  onToggle: () => void
  onEmployeeClick?: (funcionario: Funcionario) => void
}

export function DepartmentSection({
  title,
  funcionarios,
  collapsed,
  viewMode,
  onToggle,
  onEmployeeClick,
}: DepartmentSectionProps) {
  const isCollapsed = viewMode === "collapsed" ? true : collapsed

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            {isCollapsed ? "Expandir" : "Recolher"}
          </button>

          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          {funcionarios.length} colaborador{funcionarios.length !== 1 ? "es" : ""}
        </span>
      </div>

      {!isCollapsed ? (
        funcionarios.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-500">
            Nenhum funcionário neste grupo.
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {funcionarios.map((funcionario) => (
              <EmployeeListItem
                key={funcionario.id}
                funcionario={funcionario}
                onClick={onEmployeeClick}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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