'use client'

import { useFormState } from 'react-dom'
import { login, type FormState } from './actions'

const initialFormState: FormState = {
  message: ''
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialFormState)

  return (
    <form
      action={formAction}
      className="flex w-[36rem] flex-col gap-6 border border-gray-200 p-16"
    >
      <input
        type="text"
        name="username"
        placeholder="아이디"
        className="border-x-0 border-b-2 border-t-0 border-gray-300 pl-0 text-lg placeholder:text-gray-400 focus:border-b-gray-600"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        className="border-x-0 border-b-2 border-t-0 border-gray-300 pl-0 text-lg tracking-[.15rem] placeholder:tracking-normal placeholder:text-gray-400 focus:border-b-gray-600"
      />
      <div className="flex cursor-pointer items-center [&>*]:cursor-pointer">
        <input
          id="auto-login"
          type="checkbox"
          name="auto-login"
          className="h-5 w-5 rounded-full text-main"
        />
        <label
          htmlFor="auto-login"
          className="ml-2 select-none text-sm text-gray-700"
        >
          간편로그인 정보 저장
        </label>
      </div>
      {state?.message && (
        <p className="bg-gray-50 p-5 text-sm text-red-500">{state?.message}</p>
      )}
      <button className="mt-4 w-full rounded bg-main py-3 hover:brightness-95 active:brightness-90">
        로그인
      </button>
      <div className="mt-4 flex justify-between">
        <a href="/register" className="text-xs">
          회원가입
        </a>
        <a href="/register" className="text-xs">
          비밀번호 찾기
        </a>
      </div>
    </form>
  )
}
