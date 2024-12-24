import {
  createServiceRepo,
  deleteServiceRepo,
  getServiceRepo,
  updateServiceRepo,
} from '../../../repositories/service.repository'
import { Service } from '../../../types/service'

export const createService = async (service: Required<Service> & { id?: string }) => {
  return await createServiceRepo(service)
}

export const updateService = async (id: string, service: Partial<Service>) => {
  return await updateServiceRepo(id, service)
}

export const deleteService = async (id: string) => {
  return await deleteServiceRepo(id)
}

export const getServiceService = async (id: string) => {
  return await getServiceRepo(id)
}
