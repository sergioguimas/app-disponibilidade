import { FastifyRequest, FastifyReply } from 'fastify'
import { inserirStatus } from './status.service'

interface StatusBody {
  identificacao: string
  status: string
  source?: string
}

export async function inserirStatusController(
  request: FastifyRequest<{ Body: StatusBody }>
) {
  const { identificacao, status, source = 'api' } = request.body

  const result = await inserirStatus(request.organizacao_id, {
    identificacao,
    status,
    source
  })

  return result
}