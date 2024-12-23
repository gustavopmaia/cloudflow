import { prisma } from '../../../prisma'
import { Environment } from '../../../types/environment'

export const createEnvironmentService = async (environment: Required<Environment> & { id?: string }) => {
  return await prisma.environments.create({
    data: environment,
  })
}
