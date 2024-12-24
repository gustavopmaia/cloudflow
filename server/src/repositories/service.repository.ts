import { prisma } from '../prisma'
import { Service } from '../types/service'

export const createServiceRepo = async (service: Required<Service> & { id?: string }) => {
  return prisma.services.create({ data: service })
}

export const updateServiceRepo = async (id: string, data: Partial<Service>) => {
  return await prisma.services.update({ where: { id }, data })
}

export const deleteServiceRepo = async (id: string) => {
  return await prisma.services.delete({ where: { id } })
}

export const getServiceRepo = async (id: string) => {
  return await prisma.services.findUnique({ where: { id } })
}
