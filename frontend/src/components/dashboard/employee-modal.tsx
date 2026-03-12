import { useState } from "react"
import type { Funcionario, Status } from "../../types/funcionario"
import { StatusBadge } from "./status-badge"
import { updateStatus } from "../../lib/api/status"

interface EmployeeModalProps {
  funcionario: Funcionario | null
  open: boolean
  onClose: () => void
  onStatusUpdated: (identificacao: string, status: Status) => void
}

export function EmployeeModal({
  funcionario,
  open,
  onClose,
  onStatusUpdated,
}: EmployeeModalProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  if (!open || !funcionario) return null

  async function handleChangeStatus(status: Status) {
    if (!funcionario) return
    
    try {
      setSaving(true)
      setError("")

      await updateStatus({
        identificacao: funcionario.identificacao,
        status,
      })

      onStatusUpdated(funcionario.identificacao, status)
      onClose()
    } catch (err) {
      console.error(err)
      setError("Não foi possível atualizar o status.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{funcionario.nome}</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Identificação: {funcionario.identificacao}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-800 px-3 py-1 text-sm text-zinc-300 transition hover:bg-zinc-900"
          >
            Fechar
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-2 text-sm text-zinc-400">Status atual</p>
            <StatusBadge status={funcionario.status_atual} />
          </div>

          <div>
            <p className="mb-2 text-sm text-zinc-400">Alterar status</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleChangeStatus("available")}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-50"
              >
                Disponível
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleChangeStatus("busy")}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/20 disabled:opacity-50"
              >
                Atendimento
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleChangeStatus("coffee")}
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 transition hover:bg-amber-500/20 disabled:opacity-50"
              >
                Café
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-zinc-400">Departamento</p>
            <p className="text-sm text-zinc-100">
              {funcionario.departamento || "Sem departamento"}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-zinc-400">Observação</p>
            <p className="min-h-[72px] rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-200">
              {funcionario.observacao || "Nenhuma observação informada."}
            </p>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}