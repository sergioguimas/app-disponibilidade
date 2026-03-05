import { FastifyInstance } from 'fastify'
import funcionariosRoutes from '../modules/funcionarios/funcionarios.routes'
import statusRoutes from '../modules/status/status.routes'

export default async function routes(app: FastifyInstance) {
  app.register(funcionariosRoutes, { prefix: '/funcionarios' })
  app.register(statusRoutes, { prefix: '/status' })
}