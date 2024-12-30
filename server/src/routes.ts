import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserController,
  getUserController,
  GetUserEnvironmentController,
  loginController,
  updateUserController,
} from './domains/user/controller/user.controller'
import {
  createEnvironmentController,
  deleteEnvironmentController,
  getEnvironmentServicesController,
  updateEnvironmentController,
} from './domains/environment/controller/environment.controller'
import {
  createServiceController,
  deleteServiceController,
  getServiceController,
  updateServiceController,
} from './domains/service/controller/service.controller'
import { authenticate } from './utils/auth'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', (req, res) => createUserController(req, res))
  app.get('/users/:id', { preHandler: authenticate }, (req, res) => getUserController(req, res))
  app.patch('/users/:id', { preHandler: authenticate }, (req, res) => updateUserController(req, res))
  app.get('/users/:id/environments', { preHandler: authenticate }, (req, res) =>
    GetUserEnvironmentController(req, res)
  )

  app.post('/environments/:userId', { preHandler: authenticate }, (req, res) =>
    createEnvironmentController(req, res)
  )
  app.patch('/environments/:id', { preHandler: authenticate }, (req, res) =>
    updateEnvironmentController(req, res)
  )
  app.delete('/environments/:id', { preHandler: authenticate }, (req, res) =>
    deleteEnvironmentController(req, res)
  )
  app.get('/environments/:id/services', { preHandler: authenticate }, (req, res) =>
    getEnvironmentServicesController(req, res)
  )

  app.post('/services/:environmentId', { preHandler: authenticate }, async (req, res) =>
    createServiceController(req, res)
  )
  app.patch('/services/:id', { preHandler: authenticate }, async (req, res) =>
    updateServiceController(req, res)
  )
  app.get('/services/:id', { preHandler: authenticate }, async (req, res) => getServiceController(req, res))
  app.delete('/services/:id', { preHandler: authenticate }, async (req, res) =>
    deleteServiceController(req, res)
  )

  app.post('/login', async (req, res) => loginController(req, res))

  app.get('/', { preHandler: authenticate }, async (_req: FastifyRequest, res: FastifyReply) => {
    res.send({ hello: 'world' })
  })
}
