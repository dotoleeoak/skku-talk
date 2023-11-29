import { Inter } from 'next/font/google'
import LoginForm from './login-form'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className={`my-8 text-3xl font-medium ${inter.className}`}>
        SKKU TALK
      </h1>
      <LoginForm />
    </main>
  )
}
