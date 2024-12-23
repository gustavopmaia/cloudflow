import { prisma } from '../prisma'
import { Environment } from '../types/environment'
import { Service } from '../types/service'

const createEnvironment = async (environment: Required<Environment> & { id?: string }) => {
  return prisma.environment.create({ data: environment })
}

const getUserEnvironment = async (userId: string) => {
  return prisma.environment.findMany({ where: { userId } })
}

const updateEnvironment = async (id: string, data: Partial<Environment>) => {
  return prisma.environment.update({ where: { id }, data })
}

const deleteEnvironment = async (id: string) => {
  return prisma.environment.delete({ where: { id } })
}

const createEnvironmentService = async (
  environmentId: string,
  service: Required<Service> & { id?: string }
) => {
  return prisma.environmentService.create({ data: { ...service, environmentId } })
}
