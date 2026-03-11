import { useEffect, useMemo, useState } from "react"
import { getFuncionarios } from "../../lib/api/funcionarios"
import type { Funcionario } from "../../types/funcionario"
import { DepartmentSection } from "../../components/dashboard/department-section"

export function DashboardPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  const grupos = useMemo(() => {
    const mapa = new Map<string, Funcionario[]>()

    for (const funcionario of funcionarios) {
      const nomeGrupo = funcionario.departamento?.trim() || "Sem departamento"

      if (!mapa.has(nomeGrupo)) {
        mapa.set(nomeGrupo, [])
      }

      mapa.get(nomeGrupo)!.push(funcionario)
    }

    return Array.from(mapa.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [funcionarios])

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Painel de Disponibilidade</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Acompanhe em tempo real o status da equipe.
          </p>
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"
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
          <div className="space-y-10">
            {grupos.map(([nomeGrupo, items]) => (
              <DepartmentSection
                key={nomeGrupo}
                title={nomeGrupo}
                funcionarios={items}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}