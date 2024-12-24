import { prisma } from '../prisma'
import { User } from '../types/user'

export const createUser = async (data: Required<User> & { id?: string }) => {
  return prisma.user.create({ data })
}

export const getUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
  })
}

export const updateUser = async (id: string, data: Partial<User>) => {
  return prisma.user.update({ where: { id }, data })
}

export const getUserEnvironment = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      environments: true,
    },
  })
}
