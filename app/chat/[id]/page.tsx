import ChatForm from './ChatForm'
import ChatList from './ChatList'
import GoBackButton from './GoBackButton'
import { getChatRoomUsers } from './actions'
import { cookies } from 'next/headers'
import { verify } from '@/libs/jwt'
import prisma from '@/libs/db'
import PushNotification from '@/components/PushNotification'

interface Props {
  params: {
    id: string
  }
}

export default async function Chat({ params }: Props) {
  // TODO: redirect to login page
  const token = cookies().get('access_token')
  if (!token) return []

  const payload = await verify(token.value)
  if (!payload) return []

  const username = payload.username as string
  const users = await getChatRoomUsers(+params.id)

  const chatList = await prisma.chatRoom.findMany({
    where: {
      ChatRoomUsers: {
        some: {
          user: {
            username
          }
        }
      },
      NOT: {
        id: +params.id
      }
    },
    select: {
      id: true
    }
  })

  return (
    <main className="relative mx-auto h-full w-[28rem] overflow-y-scroll rounded-xl border bg-[#becede]">
      <PushNotification chatList={chatList} username={username} />
      <header className="flex h-16 items-center gap-4 p-4">
        <GoBackButton />
        <div className="text-lg">
          {users
            .filter((user) => user.username !== username)
            .map((user) => user.name)
            .join(', ')}
          {users.length > 2 && <span className="ml-2 text-gray-500">2</span>}
        </div>
      </header>
      <ChatList roomId={+params.id} username={username} />
      <ChatForm roomId={+params.id} username={username} />
    </main>
  )
}
