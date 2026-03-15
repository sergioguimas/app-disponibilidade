import { supabase } from '../../plugins/supabase'

export async function listarFuncionarios(organizacao_id: string) {

  const { data, error } = await supabase
    .from('funcionarios')
    .select(`
      id,
      nome,
      identificacao,
      departamento,
      status_atual,
      status_atual_em
    `)
    .eq('organizacao_id', organizacao_id)
    .order('nome', { ascending: true })

  if (error) throw new Error(error.message)

  return data
}