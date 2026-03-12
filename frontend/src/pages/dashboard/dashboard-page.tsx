import { useEffect, useMemo, useState } from "react"
import { getFuncionarios } from "../../lib/api/funcionarios"
import type { Funcionario, Status } from "../../types/funcionario"
import { DepartmentSection } from "../../components/dashboard/department-section"
import type { ViewMode } from "../../components/dashboard/department-section"
import { EmployeeModal } from "../../components/dashboard/employee-modal"

function getTimestamp(data?: string | null) {
  if (!data) return 0

  const timestamp = new Date(data).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function DashboardPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null)
  const [departmentFilter] = useState("todos")
  const [collapsedDepartments, setCollapsedDepartments] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [sortMode, setSortMode] = useState<"name" | "recent">("name")

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError("")

        const data = await getFuncionarios()
        setFuncionarios(data)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar os funcionários.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const funcionariosFiltrados = useMemo(() => {
    if (departmentFilter === "todos") return funcionarios

    return funcionarios.filter(
      (funcionario) =>
        (funcionario.departamento?.trim() || "Sem departamento") === departmentFilter
    )
  }, [funcionarios, departmentFilter])

  const grupos = useMemo(() => {
    const funcionariosOrdenados = [...funcionariosFiltrados].sort((a, b) => {
      if (sortMode === "recent") {
        return getTimestamp(b.status_atual_em) - getTimestamp(a.status_atual_em)
      }
      return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
    })

    

    const mapa = new Map<string, Funcionario[]>()

    for (const funcionario of funcionariosOrdenados) {
      const nomeGrupo = funcionario.departamento?.trim() || "Sem departamento"

      if (!mapa.has(nomeGrupo)) {
        mapa.set(nomeGrupo, [])
      }

      mapa.get(nomeGrupo)?.push(funcionario)
    }

    return Array.from(mapa.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [funcionariosFiltrados, sortMode])

  useEffect(() => {
    if (viewMode === "collapsed") {
      const nextState: Record<string, boolean> = {}

      for (const [nomeGrupo] of grupos) {
        nextState[nomeGrupo] = true
      }

      setCollapsedDepartments(nextState)
      return
    }

    setCollapsedDepartments({})
  }, [viewMode, grupos])

  const totalFuncionarios = funcionariosFiltrados.length
  const totalDisponiveis = funcionariosFiltrados.filter(
    (f) => f.status_atual === "available"
  ).length
  const totalOcupados = funcionariosFiltrados.filter(
    (f) => f.status_atual === "busy"
  ).length
  const totalPausa = funcionariosFiltrados.filter(
    (f) => f.status_atual === "coffee"
  ).length
  const totalSemStatus = funcionariosFiltrados.filter(
    (f) => !f.status_atual
  ).length

  function toggleDepartment(nomeDepartamento: string) {
    setCollapsedDepartments((current) => ({
      ...current,
      [nomeDepartamento]: !current[nomeDepartamento],
    }))
  }

  function handleStatusUpdated(
    identificacao: string,
    status: Status | null
  ) {
    const now = new Date().toISOString()

    setFuncionarios((current) =>
      current.map((funcionario) =>
        funcionario.identificacao === identificacao
          ? {
              ...funcionario,
              status_atual: status ?? null,
              status_atual_em: now,
            }
          : funcionario
      )
    )

    setSelectedFuncionario((current) =>
      current && current.identificacao === identificacao
        ? {
            ...current,
            status_atual: status ?? null,
            status_atual_em: now,
          }
        : current
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-5 sm:px-6 lg:px-8 2xl:px-10">
        <header className="mb-6">
          <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Painel de Disponibilidade
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Acompanhe em tempo real o status da equipe.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Total</p>
                <p className="mt-1 text-xl font-semibold text-white">{totalFuncionarios}</p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-emerald-300/70">
                  Disponíveis
                </p>
                <p className="mt-1 text-xl font-semibold text-emerald-300">
                  {totalDisponiveis}
                </p>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-rose-300/70">
                  Ocupados
                </p>
                <p className="mt-1 text-xl font-semibold text-rose-300">
                  {totalOcupados}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-amber-300/70">
                  Em café
                </p>
                <p className="mt-1 text-xl font-semibold text-amber-300">
                  {totalPausa}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Offline
                </p>
                <p className="mt-1 text-xl font-semibold text-zinc-300">
                  {totalSemStatus}
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 p-4">
          <div className="flex flex-wrap items-end gap-6">

            {/* VIEW MODE */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-400">Visualização</p>

              <div className="mt-2 inline-flex items-center rounded-xl border border-zinc-800 bg-zinc-900 p-1 gap-2">

                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    viewMode === "cards"
                      ? "bg-zinc-700 text-white ring-2 ring-zinc-600"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Cards
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    viewMode === "list"
                      ? "bg-zinc-700 text-white ring-2 ring-zinc-600"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Lista
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("collapsed")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    viewMode === "collapsed"
                      ? "bg-zinc-700 text-white ring-2 ring-zinc-600"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Recolhido
                </button>

              </div>
            </div>

            {/* SORT MODE */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-400">Ordenar por</p>

              <select
                id="sortMode"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as "name" | "recent")}
                className="mt-2 h-[38px] min-w-[220px] rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 outline-none transition focus:border-zinc-700"
              >
                <option value="name">Nome (A–Z)</option>
                <option value="recent">Atualização mais recente</option>
              </select>
            </div>

          </div>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        ) : grupos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-400">
            Nenhum funcionário encontrado.
          </div>
        ) : (
          <div className="space-y-6">
            {grupos.map(([nomeGrupo, items]) => (
              <DepartmentSection
                key={nomeGrupo}
                title={nomeGrupo}
                funcionarios={items}
                collapsed={!!collapsedDepartments[nomeGrupo]}
                viewMode={viewMode}
                onToggle={() => toggleDepartment(nomeGrupo)}
                onEmployeeClick={setSelectedFuncionario}
              />
            ))}
          </div>
        )}
      </div>

      <EmployeeModal
        funcionario={selectedFuncionario}
        open={!!selectedFuncionario}
        onClose={() => setSelectedFuncionario(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </main>
  )
}