import { FastifyInstance } from 'fastify'
import { inserirStatusController } from './status.controller'


export default async function statusRoutes(app: FastifyInstance) {

  app.post('/webhook', {
    
    schema: {
      body: {
        type: 'object',
        required: ['identificacao', 'status'],
        properties: {
          identificacao: { type: 'string' },
          status: { type: 'string' },
          source: { type: 'string' }
        }
      }
    }

  }, inserirStatusController)

  app.post('/manual', {
    schema: {
      body: {
        type: 'object',
        required: ['identificacao', 'status'],
        properties: {
          identificacao: { type: 'string' },
          status: { type: 'string' },
          source: { type: 'string' }
        }
      }
    }
  }, inserirStatusController)

}