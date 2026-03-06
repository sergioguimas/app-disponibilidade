interface Props {
  funcionario: any
  historico: any[]
  onClose: () => void
}

export default function FuncionarioModal({ funcionario, historico, onClose }: Props) {

  if (!funcionario) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end">

      <div className="bg-white w-full rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">

        <div className="flex justify-between mb-3">
          <h2 className="font-bold text-lg">
            {funcionario.nome}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {historico.map((h, i) => (
          <div
            key={i}
            className="border-b py-2 flex justify-between text-sm"
          >
            <span>{h.status}</span>
            <span>{h.hora}</span>
          </div>
        ))}

      </div>

    </div>
  )
}