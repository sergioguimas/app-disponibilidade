import { FastifyInstance } from 'fastify'
import { getFuncionarios } from './funcionarios.controller'

export default async function funcionariosRoutes(app: FastifyInstance) {

  app.get('/', getFuncionarios)

}