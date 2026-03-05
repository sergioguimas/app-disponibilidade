import { FastifyRequest, FastifyReply } from 'fastify'
import { inserirStatus } from './status.service'

export async function receberStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const secret = request.headers['x-webhook-secret']

  if (secret !== process.env.WEBHOOK_SECRET) {
    return reply.status(401).send({ error: 'Não autorizado' })
  }

  const body = request.body as any

  if (!body.identificacao || !body.status) {
    return reply.status(400).send({
      error: 'identificacao e status são obrigatórios'
    })
  }

  try {
    const result = await inserirStatus(body)
    return reply.send(result)
  } catch (error: any) {
    return reply.status(400).send({ error: error.message })
  }
}