import { supabase } from '../plugins/supabase'

export async function getOrganizacaoId(slug: string) {

  const { data, error } = await supabase
    .from('organizacoes')
    .select('id')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    throw new Error('Organização não encontrada')
  }

  return data.id
}