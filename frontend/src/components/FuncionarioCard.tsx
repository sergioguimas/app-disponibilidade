interface Props {
  funcionario: any
  onClick: () => void
}

export default function FuncionarioCard({ funcionario, onClick }: Props) {

  const statusColor: Record<string, string> = {
    disponivel: "bg-green-500",
    ocupado: "bg-red-500",
    pausa: "bg-yellow-400",
    offline: "bg-gray-400"
  }

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl text-white font-medium shadow cursor-pointer ${statusColor[funcionario.status]}`}
    >
      {funcionario.nome}
    </div>
  )
}