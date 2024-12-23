import { prisma } from '../prisma'
import { User } from '../types/user'

const createUser = async (data: Required<User> & { id?: string }) => {
  prisma.user.create({ data })
}

const getUser = async (id: string) => {
  prisma.user.findUnique({ where: { id } })
}

const updateUser = async (id: number, data: Partial<User>) => {
  prisma.user.update({ where: { id }, data })
}
