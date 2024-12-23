import fastify from 'fastify'
import { appRoutes } from './routes'
import errorHandler from './utils/error-handler'

const server = fastify()

server.register(appRoutes)
server.setErrorHandler(errorHandler)

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
