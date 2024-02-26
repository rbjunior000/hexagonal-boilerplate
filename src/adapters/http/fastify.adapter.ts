import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { env } from '@/config'
import { IDependencies } from '@/core/shared/types'
import { IServer, UserHttp } from '@/ports/http'
import { withError } from '@/support'
import { AuthHttp } from '@/ports/http/modules/auth'

const PORT = env('PORT')

const createServer =  async () => {
  const fastify = Fastify({ logger: true })

  return {
    addRoute: (route: any) => {
      fastify.route(route)
    },
    start: async () => {
      await fastify.listen({port: +PORT})
    }
  }
}


const start = async (dependencies: IDependencies) => {
  try {

    const server = await createServer()
    const modules = [
      UserHttp(dependencies),
      AuthHttp(dependencies),
    ]

    for (const module of modules) {
      const routes = Object.values(module)
      routes.forEach(({ execute, method, path, statusResponseCode = 200 }) => {
        server.addRoute({
          method: method,
          url: path,
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            try {
              const input = {
                query: req.query ?? {},
                params: req.params ?? {},
                body: req.body ?? {},
                headers: req.headers ?? {}
              } as never
              const response = await execute(input, {})
              reply.code(statusResponseCode).send(response)
            } catch(err) {
              const { error } = withError(err as Error)
              reply.code(error.code).send(error)
            }
          }
        })
      })
    }

    await server.start()
  } catch (err) {
    const error = err as Error
    console.log(`[FATAL-ERROR]: ${JSON.stringify(error.stack)}`)
    process.exit(1)
  }
}

export const Server: IServer = {
  start
}
