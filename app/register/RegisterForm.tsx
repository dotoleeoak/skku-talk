'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from './actions'
import RegisterInput from './RegisterInput'

const schema = z
  .object({
    realname: z.string().min(1, { message: '이름을 입력해주세요.' }),
    username: z
      .string()
      .min(1, { message: '아이디를 입력해주세요.' })
      .min(3, { message: '아이디는 최소 3글자 이상이어야 합니다.' })
      .max(20, { message: '아이디는 최대 20글자까지 가능합니다.' })
      .refine((data) => /^[a-z0-9]{3,20}$/.test(data), {
        message: '아이디는 영문 소문자와 숫자만 사용할 수 있습니다.'
      }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8글자 이상이어야 합니다.' })
      .max(32, { message: '비밀번호는 최대 32글자까지 가능합니다.' })
      .refine((data) => /^[a-zA-Z0-9!@#$%^&*()_+]{8,32}$/.test(data), {
        message:
          '비밀번호는 영문 대소문자, 숫자, 특수문자만 사용할 수 있습니다.'
      }),
    passwordConfirm: z.string()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm']
  })

type RegisterForm = z.infer<typeof schema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema)
  })

  const [error, setError] = useState<string>('')

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createUser(data)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-[36rem] flex-col gap-6 border border-gray-200 p-16"
    >
      <h2 className="mb-8 text-2xl">회원가입 정보를 입력해주세요.</h2>
      <RegisterInput
        attrs={register('realname')}
        error={errors.realname?.message}
        placeholder="이름"
      />
      <RegisterInput
        attrs={register('username')}
        error={errors.username?.message}
        placeholder="아이디"
      />
      <RegisterInput
        attrs={register('password')}
        error={errors.password?.message}
        placeholder="비밀번호"
        type="password"
      />
      <RegisterInput
        attrs={register('passwordConfirm')}
        error={errors.passwordConfirm?.message}
        placeholder="비밀번호 확인"
        type="password"
      />
      {error && <p className="bg-gray-50 p-5 text-sm text-red-500">{error}</p>}
      <button className="mt-4 w-full rounded bg-main py-3 hover:brightness-95 active:brightness-90">
        확인
      </button>
    </form>
  )
}
