import { cookies } from 'next/headers'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import { verify } from '@/libs/jwt'
import { getChatRooms } from './actions'

export default async function Chat() {
  const token = cookies().get('access_token')
  if (!token) return []

  const payload = await verify(token.value)
  if (!payload) return []

  const username = payload.username as string
  const chatRooms = await getChatRooms(username)

  const chatRoomList = chatRooms.map(
    ({ id, name, ChatMessage, ChatRoomUsers }) => ({
      id,
      name: name || ChatRoomUsers.map(({ user }) => user.name).join(', '),
      lastMessage:
        ChatMessage.length > 0
          ? ChatMessage[ChatMessage.length - 1].message
          : '',
      lastTime:
        ChatMessage.length > 0
          ? ChatMessage[ChatMessage.length - 1].createdAt
          : null
    })
  )

  return (
    <>
      <ChatListHeader />
      <ul>
        {chatRoomList.map(({ id, name, lastMessage, lastTime }) => (
          <ChatListItem
            key={id}
            id={id}
            name={name}
            lastMessage={lastMessage}
            lastTime={lastTime?.toLocaleTimeString('ko-KR', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          />
        ))}
      </ul>
    </>
  )
}
