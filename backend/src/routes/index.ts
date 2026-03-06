import { FastifyInstance } from 'fastify'

import statusRoutes from '../modules/status/status.routes'
import funcionariosRoutes from '../modules/funcionarios/funcionarios.routes'

export default async function routes(app: FastifyInstance) {

  app.register(statusRoutes, {
    prefix: '/status'
  })

  app.register(funcionariosRoutes, {
    prefix: '/funcionarios'
  })

}