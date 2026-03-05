import { FastifyRequest, FastifyReply } from 'fastify'
import { listarFuncionarios } from './funcionarios.service'

export async function getFuncionarios(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const funcionarios = await listarFuncionarios()
  return reply.send(funcionarios)
}