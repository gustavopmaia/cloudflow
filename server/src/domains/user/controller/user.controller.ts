import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { User } from '../../../types/user'
import {
  createUserService,
  getUserEnvironmentService,
  getUserService,
  updateUserService,
  verifyUserEmail,
} from '../services/user.service'
import { errorMessage, successMessage } from '../../../utils/messages'
import { AppError } from '../../../utils/error-handler'
import { Prisma } from '@prisma/client'
import argon2 from 'argon2'
import { generateToken } from '../../../utils/jwt'

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user: Required<User> & { id?: string } = request.body as Required<User> & { id?: string }

    const validateUser = z.object({
      name: z.string().nonempty('Name is required'),
      lastName: z.string().nonempty('Last name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })

    const validation = validateUser.safeParse(user)
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    const response = await createUserService(user)

    return reply.status(201).send(successMessage({ ...user, id: response.id }))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.status(409).send(errorMessage('A user with this email already exists', 409))
      }
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send(errorMessage(error.message, 500))
    }

    return reply.status(500).send(errorMessage('Internal server error', 500))
  }
}

export const getUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }

    const user = await getUserService(id)

    if (!user) {
      return reply.status(404).send(errorMessage('User not found', 404))
    }

    return reply.status(200).send(successMessage(user))
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

export const updateUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }
    const user: Partial<User> = request.body as Partial<User>

    const validateUser = z.object({
      name: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    })

    const validation = validateUser.safeParse(user)
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    if (user.password) {
      user.password = await argon2.hash(user.password)
      return await updateUserService(id, user)
    }

    const { password, ...userReturn } = await updateUserService(id, user)

    return reply.status(200).send(successMessage(userReturn))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return reply.status(404).send(errorMessage('User not found', 404))
      }
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorMessage(error.message, error.statusCode))
    }

    if (error instanceof Error) {
      return reply.status(500).send(errorMessage(error.message, 500))
    }

    return reply.status(500).send(errorMessage('Internal server error', 500))
  }
}

export const GetUserEnvironmentController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }

    const user = await getUserEnvironmentService(id)

    if (!user) {
      return reply.status(404).send(errorMessage('User not found', 404))
    }

    return reply.status(200).send(successMessage(user.environments))
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

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user: Pick<User, 'email' | 'password'> = request.body as Pick<User, 'email' | 'password'>

    const validateUser = z.object({
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })

    const validation = validateUser.safeParse(user)
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))

      const formattedErrors = errors.map((err) => `${err.path}: ${err.message}`).join(', ')
      return reply.status(400).send(errorMessage('Validation error', 400, formattedErrors))
    }

    const response = await verifyUserEmail(user.email)

    if (!response) {
      return reply.status(404).send(errorMessage('User not found', 404))
    }

    const isValid = await argon2.verify(response.password, user.password)

    if (!isValid) {
      return reply.status(401).send(errorMessage('Invalid email or password', 401))
    }

    const token = generateToken({ id: response.id })

    return reply.status(200).send(successMessage({ token }))
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
