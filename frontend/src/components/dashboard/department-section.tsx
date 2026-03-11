import type { Funcionario } from "../../types/funcionario"
import { EmployeeCard } from "./employee-card"

interface DepartmentSectionProps {
  title: string
  funcionarios: Funcionario[]
  onEmployeeClick?: (funcionario: Funcionario) => void
}

export function DepartmentSection({
  title,
  funcionarios,
  onEmployeeClick,
}: DepartmentSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          {funcionarios.length} colaborador{funcionarios.length !== 1 ? "es" : ""}
        </span>
      </div>

      {funcionarios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-500">
          Nenhum funcionário neste grupo.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {funcionarios.map((funcionario) => (
            <EmployeeCard
              key={funcionario.id}
              funcionario={funcionario}
              onClick={onEmployeeClick}
            />
          ))}
        </div>
      )}
    </section>
  )
}