'use server'

import prisma from '@/libs/db'
import { sign } from '@/libs/jwt'
import { verify } from 'argon2'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface FormState {
  message: string
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()
  const autoLogin = !!formData.get('auto-login')

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

  // Issue JWT
  const token = await sign(username)
  cookies().set('access_token', token, {
    httpOnly: true,
    maxAge: autoLogin ? 60 * 60 * 24 * 7 : undefined // 7 days
  })

  redirect('/')
}
