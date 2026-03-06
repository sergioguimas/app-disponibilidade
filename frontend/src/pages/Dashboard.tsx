import { useState } from "react"
import DepartmentSection from "../components/DepartmentSection"
import EmployeeModal from "../components/FuncionarioModal"

export default function Dashboard({ dados }: any) {

  const [selecionado, setSelecionado] = useState<any>(null)

  return (
    <div className="p-4">

      {dados.departamentos.map((dep: any) => (
        <DepartmentSection
          key={dep.id}
          nome={dep.nome}
          funcionarios={dep.funcionarios}
          onSelect={setSelecionado}
        />
      ))}

      <EmployeeModal
        funcionario={selecionado}
        historico={selecionado?.historico || []}
        onClose={() => setSelecionado(null)}
      />

    </div>
  )
}