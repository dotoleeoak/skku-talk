'use server'

import { redirect } from 'next/navigation'
import { hash } from 'argon2'
import prisma from '@/libs/db'

export async function createUser(data: Record<string, any>): Promise<void> {
  const { realname, username, password } = data

  const hashedPassword = await hash(password)

  const userWithSameUsername = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (userWithSameUsername) {
    throw new Error('이미 사용중인 아이디입니다.')
  }

  await prisma.user.create({
    data: {
      name: realname,
      username,
      password: hashedPassword
    }
  })

  redirect('/login')
}
