import { prisma } from '../../../prisma'
import {
  createEnvironment,
  deleteEnvironment,
  getEnvironmentServiceRepo,
  updateEnvironment,
} from '../../../repositories/environment.repository'
import { Environment } from '../../../types/environment'

export const createEnvironmentService = async (environment: Required<Environment> & { id?: string }) => {
  return await createEnvironment(environment)
}

export const updateEnvironmentService = async (environment: Partial<Environment> & { id: string }) => {
  return await updateEnvironment(environment.id, environment)
}

export const deleteEnvironmentService = async (id: string) => {
  return await deleteEnvironment(id)
}

export const getEnvironmentServicesService = async (id: string) => {
  return await getEnvironmentServiceRepo(id)
}
