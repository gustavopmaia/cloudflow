import { FastifyReply, FastifyRequest } from 'fastify'
import { errorMessage, successMessage } from '../../../utils/messages'
import { createService, deleteService, getServiceService, updateService } from '../services/service.service'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { AppError } from '../../../utils/error-handler'
import { Service } from '../../../types/service'

export const createServiceController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const service = request.body as Required<Service> & { id?: string }

    const { environmentId } = request.params as { environmentId: string }

    const validateService = z.object({
      id: z.string().optional(),
      name: z.string(),
      environmentId: z.string(),
    })

    service.environmentId = environmentId

    const validation = validateService.safeParse(service)

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    const response = await createService(service)

    return reply.status(201).send(successMessage(response))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send({ message: 'A service with this name already exists' })
      }
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message })
    }
  }
}

export const updateServiceController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const service = request.body as Partial<Service> & { id: string }

    const { id } = request.params as { id: string }

    service.id = id

    const validateService = z.object({
      id: z.string(),
      name: z.string().optional(),
    })

    const validation = validateService.safeParse(service)

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    const response = await updateService(service.id, service)

    return reply.status(200).send(successMessage(response))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send({ message: 'A service with this name already exists' })
      }
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message })
    }
  }
}

export const getServiceController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }

    const service = await getServiceService(id)

    if (!service) {
      return reply.status(404).send(errorMessage('Service not found', 404))
    }

    return reply.status(200).send(successMessage(service))
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send(errorMessage(error.message, 500))
    }

    return reply.status(500).send(errorMessage('Internal server error', 500))
  }
}

export const deleteServiceController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }

    await deleteService(id)

    return reply.status(200).send(successMessage('Service deleted'))
  } catch (error) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
