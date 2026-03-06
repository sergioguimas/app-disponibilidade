import FuncionarioCard from "./FuncionarioCard"

interface Props {
  nome: string
  funcionarios: any[]
  onSelect: (f: any) => void
}

export default function DepartmentSection({ nome, funcionarios, onSelect }: Props) {

  return (
    <div className="mb-4">
      
      <h2 className="text-lg font-bold mb-2">
        {nome}
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {funcionarios.map((f) => (
          <FuncionarioCard
            key={f.id}
            funcionario={f}
            onClick={() => onSelect(f)}
          />
        ))}
      </div>

    </div>
  )
}