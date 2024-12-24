import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyToken } from './jwt'
import { errorMessage } from './messages'

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send(errorMessage('Authorization token is missing', 401))
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    request.user = {
      id: decoded.id,
      email: decoded.email,
    }
  } catch (error) {
    console.log(error)
    return reply.status(401).send(errorMessage('Invalid or expired token', 401))
  }
}
