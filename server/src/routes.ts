import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserController,
  getUserController,
  GetUserEnvironmentController,
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

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', (req, res) => createUserController(req, res))
  app.get('/users/:id', (req, res) => getUserController(req, res))
  app.patch('/users/:id', (req, res) => updateUserController(req, res))
  app.get('/users/:id/environments', (req, res) => GetUserEnvironmentController(req, res))

  app.post('/environments/:userId', (req, res) => createEnvironmentController(req, res))
  app.patch('/environments/:id', (req, res) => updateEnvironmentController(req, res))
  app.delete('/environments/:id', (req, res) => deleteEnvironmentController(req, res))
  app.get('/environments/:id/services', (req, res) => getEnvironmentServicesController(req, res))

  app.post('/services/:environmentId', async (req, res) => createServiceController(req, res))
  app.patch('/services/:id', async (req, res) => updateServiceController(req, res))
  app.get('/services/:id', async (req, res) => getServiceController(req, res))
  app.delete('/services/:id', async (req, res) => deleteServiceController(req, res))

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ hello: 'world' })
  })
}
