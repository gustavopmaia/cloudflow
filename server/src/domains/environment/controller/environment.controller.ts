import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createEnvironmentService } from '../services/environment.service'
import { Environment } from '../../../types/environment'
import { z } from 'zod'
import { errorMessage, successMessage } from '../../../utils/messages'
import { AppError } from '../../../utils/error-handler'

export const createEnvironmentController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const environment: Required<Environment> & { id?: string } = request.body as Required<Environment> & {
      id?: string
    }

    const { userId } = request.params as { userId: string }

    environment.userId = userId

    const validateEnvironment = z.object({
      id: z.string().optional(),
      type: z.string(),
      cloudProvider: z.string().optional(),
      cpuSize: z.number(),
      memorySize: z.number(),
      storage: z.number(),
      userId: z.string(),
    })

    const validation = validateEnvironment.safeParse(environment)

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    const response = await createEnvironmentService(environment)

    return reply.status(201).send(successMessage(response))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send({ message: 'An environment with this name already exists' })
      }
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
