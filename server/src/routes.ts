import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserController,
  getUserController,
  updateUserController,
} from './domains/user/controller/user.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', (req, res) => createUserController(req, res))
  app.get('/users/:id', (req, res) => getUserController(req, res))
  app.patch('/users/:id', (req, res) => updateUserController(req, res))

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ hello: 'world' })
  })
}
