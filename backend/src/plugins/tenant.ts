import { FastifyInstance } from 'fastify'
import { supabase } from './supabase'

declare module 'fastify' {
  interface FastifyRequest {
    organizacao_id: string
  }
}

export async function tenantPlugin(app: FastifyInstance) {

  app.addHook('preHandler', async (request) => {

    const slug = (request.headers['x-org-slug'] as string) || 'default'

    const { data, error } = await supabase
      .from('organizacoes')
      .select('id')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      throw new Error('Organização não encontrada')
    }

    request.organizacao_id = data.id
  })

}
