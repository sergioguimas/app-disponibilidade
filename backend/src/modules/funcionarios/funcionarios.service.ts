import { supabase } from '../../plugins/supabase'

export async function listarFuncionarios() {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('id, nome, status_atual, status_atual_em')
    .order('nome')

  if (error) {
    throw new Error(error.message)
  }

  return data
}