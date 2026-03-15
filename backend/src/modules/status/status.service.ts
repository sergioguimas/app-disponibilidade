import { supabase } from '../../plugins/supabase'

const statusValidos = [
  'available',
  'busy',
  'coffee',
  'lunch',
  'home',
  'offline'
]

interface StatusPayload {
  identificacao: string
  status: string
  source: string
}

export async function inserirStatus(
  organizacao_id: string,
  payload: StatusPayload
) {

  const { identificacao, status, source } = payload

  const { data: funcionario, error: erroFuncionario } = await supabase
  .from('funcionarios')
  .select('id')
  .eq('identificacao', identificacao)
  .eq('organizacao_id', organizacao_id)
  .single()

  if (erroFuncionario || !funcionario) {
    throw new Error('Funcionário não encontrado')
  }

  await supabase
    .from('status_logs')
    .insert([
      {
        funcionario_id: funcionario.id,
        organizacao_id,
        status,
        source
      }
    ])
}
