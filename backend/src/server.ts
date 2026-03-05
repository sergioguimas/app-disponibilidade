import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = Fastify({ logger: true })

async function bootstrap() {
  await app.register(cors, { origin: true })

  await app.register(routes)

  const PORT = Number(process.env.PORT) || 3000

  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 Server running on port ${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()