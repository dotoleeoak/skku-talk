'use server'

import prisma from '@/libs/db'
import { verify } from 'argon2'

export default async function login(formData: FormData) {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()

  if (!username || !password) {
    throw new Error('username and password are required')
    // TODO: handle errors
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username.toString()
    }
  })

  if (!user) {
    throw new Error('user not found')
  }

  if (!(await verify(user.password, password.toString()))) {
    throw new Error('invalid password')
  }

  // TODO: issue token
}
