import ChatForm from './ChatForm'
import MyChat from './MyChat'
import PartnerChat from './PartnerChat'
import GoBackButton from './GoBackButton'
import { getChatRoomUsers, getMessages } from './actions'
import { cookies } from 'next/headers'
import { verify } from '@/libs/jwt'

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
  const messages = await getMessages(+params.id)

  return (
    <main className="mx-auto h-full w-[28rem] overflow-y-scroll rounded-xl border bg-[#becede]">
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
      <section className="h-[calc(100%-14rem)] overflow-y-scroll">
        {messages.map((message, index) => {
          if (message.username === '최재민') {
            return (
              <MyChat
                key={index}
                message={message.message}
                time={message.time}
              />
            )
          } else {
            return (
              <PartnerChat
                key={index}
                username={message.username}
                message={message.message}
                time={message.time}
              />
            )
          }
        })}
      </section>
      <ChatForm chatRoomId={+params.id} />
    </main>
  )
}
