'use server'

import prisma from '@/libs/db'
import { verify } from 'argon2'

export interface FormState {
  message: string
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()

  if (!username || !password) {
    return { message: '아이디와 비밀번호를 입력해주세요.' }
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username.toString()
    }
  })

  if (!user || !(await verify(user.password, password.toString()))) {
    return { message: '아이디 또는 비밀번호가 올바르지 않습니다.' }
  }

  return { message: '' }

  // TODO: issue token
}
