import { supabase } from '../../plugins/supabase'

const statusValidos = [
  'available',
  'busy',
  'break',
  'offline',
  'away'
]

interface StatusPayload {
  identificacao: string
  status: string
  source?: string
}

export async function inserirStatus(payload: StatusPayload) {
  const { identificacao, status, source } = payload

  if (!statusValidos.includes(status)) {
    throw new Error('Status inválido')
  }

  const { data: funcionario, error: erroFuncionario } = await supabase
    .from('funcionarios')
    .select('id')
    .eq('identificacao', identificacao)
    .single()

  if (erroFuncionario || !funcionario) {
    throw new Error('Funcionário não encontrado')
  }

  const { error } = await supabase
    .from('status_logs')
    .insert({
      funcionario_id: funcionario.id,
      status,
      source
    })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}