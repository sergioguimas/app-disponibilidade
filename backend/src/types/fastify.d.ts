import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    organizacao_id: string
  }
}