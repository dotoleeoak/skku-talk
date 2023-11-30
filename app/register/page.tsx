import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verify } from '@/libs/jwt'
import RegisterForm from './RegisterForm'

const inter = Inter({ subsets: ['latin'] })

export default async function RegisterPage() {
  const token = cookies().get('access_token')
  if (token && (await verify(token.value))) {
    redirect('/')
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className={`my-8 text-3xl font-medium ${inter.className}`}>
        SKKU TALK
      </h1>
      <RegisterForm />
    </main>
  )
}
