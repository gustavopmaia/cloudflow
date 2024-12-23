import { prisma } from '../prisma'
import { Service } from '../types/service'

const updateService = async (id: string, data: Partial<Service>) => {
  return prisma.service.update({ where: { id }, data })
}

const deleteService = async (id: string) => {
  return prisma.service.delete({ where: { id } })
}
