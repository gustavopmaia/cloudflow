import argon2 from 'argon2'
import { prisma } from '../../../prisma'
import { User } from '../../../types/user'
import { userInfo } from 'os'

export const createUserService = async (user: Required<User> & { id?: string }) => {
  const hashedPassword = await argon2.hash(user.password)

  return await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  })
}

export const getUserService = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
  })
}

export const updateUserService = async (id: string, user: Partial<User>) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: user,
  })
}

export const getUserEnvironmentService = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      environments: true,
    },
  })
}
