import { FastifyRequest, FastifyReply } from 'fastify'
import { inserirStatus } from './status.service'

interface StatusBody {
  identificacao: string
  status: string
  source?: string
}

export async function receberStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const secret = request.headers['x-webhook-secret']

  if (secret !== process.env.WEBHOOK_SECRET) {
    return reply.status(401).send({ error: 'Não autorizado' })
  }

  const body = request.body as StatusBody

  if (!body || !body.identificacao || !body.status) {
    return reply.status(400).send({
      error: 'identificacao e status são obrigatórios'
    })
  }

  try {

    const result = await inserirStatus({
      identificacao: body.identificacao,
      status: body.status,
      source: body.source || 'webhook'
    })

    return reply.status(201).send(result)

  } catch (error: any) {

    request.log.error(error)

    return reply.status(400).send({
      error: error.message || 'Erro ao registrar status'
    })

  }
}

export async function atualizarStatusManual(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as StatusBody

  if (!body || !body.identificacao || !body.status) {
    return reply.status(400).send({
      error: 'identificacao e status são obrigatórios'
    })
  }

  try {
    const result = await inserirStatus({
      identificacao: body.identificacao,
      status: body.status,
      source: body.source || 'painel'
    })

    return reply.status(201).send(result)
  } catch (error: any) {
    request.log.error(error)

    return reply.status(400).send({
      error: error.message || 'Erro ao registrar status'
    })
  }
}