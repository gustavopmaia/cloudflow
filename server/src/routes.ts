import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserController,
  getUserController,
  GetUserEnvironmentController,
  updateUserController,
} from './domains/user/controller/user.controller'
import { createEnvironmentController } from './domains/environment/controller/environment.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', (req, res) => createUserController(req, res))
  app.get('/users/:id', (req, res) => getUserController(req, res))
  app.patch('/users/:id', (req, res) => updateUserController(req, res))
  app.get('/users/:id/environments', (req, res) => GetUserEnvironmentController(req, res))

  app.post('/environments/:userId', (req, res) => createEnvironmentController(req, res))

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ hello: 'world' })
  })
}
