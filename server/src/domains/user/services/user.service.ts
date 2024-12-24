import argon2 from 'argon2'
import { User } from '../../../types/user'
import {
  createUser,
  getUser,
  getUserEmail,
  getUserEnvironment,
  updateUser,
} from '../../../repositories/user.repository'

export const createUserService = async (user: Required<User> & { id?: string }) => {
  const hashedPassword = await argon2.hash(user.password)

  return await createUser({
    ...user,
    password: hashedPassword,
  })
}

export const getUserService = async (id: string) => {
  return await getUser(id)
}

export const verifyUserEmail = async (email: string) => {
  return await getUserEmail(email)
}

export const updateUserService = async (id: string, user: Partial<User>) => {
  return await updateUser(id, user)
}

export const getUserEnvironmentService = async (id: string) => {
  return await getUserEnvironment(id)
}
