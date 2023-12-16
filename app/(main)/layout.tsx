import prisma from '@/libs/db'
import { cookies } from 'next/headers'
import { verify } from '@/libs/jwt'
import PushNotification from '@/components/PushNotification'
import NavBar from './NavBar'

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('access_token')
  if (!token) return []

  const payload = await verify(token.value)
  if (!payload) return []

  const username = payload.username as string
  const chatList = await prisma.chatRoom.findMany({
    where: {
      ChatRoomUsers: {
        some: {
          user: {
            username
          }
        }
      }
    },
    select: {
      id: true
    }
  })

  return (
    <div className="relative mx-auto flex h-full w-[28rem] flex-col overflow-hidden rounded-xl border">
      <PushNotification chatList={chatList} username={username} />
      <main className="flex-1 overflow-y-scroll">{children}</main>
      <NavBar />
    </div>
  )
}
