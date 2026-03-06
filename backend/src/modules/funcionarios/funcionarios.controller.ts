import { FastifyRequest, FastifyReply } from 'fastify'
import { listarFuncionarios } from './funcionarios.service'

export async function getFuncionarios(
  request: FastifyRequest,
  reply: FastifyReply
) {

  try {

    const funcionarios = await listarFuncionarios()

    return reply.send(funcionarios)

  } catch (error: any) {

    request.log.error(error)

    return reply.status(500).send({
      error: 'Erro ao buscar funcionários'
    })

  }

}