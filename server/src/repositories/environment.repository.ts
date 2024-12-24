import { prisma } from '../prisma'
import { Environment } from '../types/environment'
import { Service } from '../types/service'

export const createEnvironment = async (environment: Required<Environment> & { id?: string }) => {
  return prisma.environments.create({ data: environment })
}

export const getUserEnvironment = async (userId: string) => {
  return prisma.environments.findMany({ where: { userId } })
}

export const updateEnvironment = async (id: string, data: Partial<Environment>) => {
  return prisma.environments.update({ where: { id }, data })
}

export const deleteEnvironment = async (id: string) => {
  return prisma.environments.delete({ where: { id } })
}

export const getEnvironmentServiceRepo = (id: string) => {
  return prisma.environments.findUnique({ where: { id }, select: { services: true } })
}
