import { FastifyRequest, FastifyReply } from 'fastify'
import { listarFuncionarios } from './funcionarios.service'

export async function listarFuncionariosController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const funcionarios = await listarFuncionarios(
    request.organizacao_id
  )

  return funcionarios
}