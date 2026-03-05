import { FastifyInstance } from 'fastify'
import { receberStatus } from './status.controller'

export default async function statusRoutes(app: FastifyInstance) {
  app.post('/webhook', receberStatus)
}