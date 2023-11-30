'use client'

import ProfileImage from '@/components/ProfileImage'
import { useRouter } from 'next/navigation'
import { getChatRoomID } from './actions'

interface Props {
  username: string
  friend: {
    name: string
    username: string
  }
}

export default function FriendListItem({ username, friend }: Props) {
  const router = useRouter()

  const openChatRoom = async () => {
    const id = await getChatRoomID(username, friend.username)
    router.push(`/chat/${id}`)
  }

  return (
    <li
      className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-50 active:bg-gray-100"
      onClick={openChatRoom}
    >
      <ProfileImage className="h-12" src="https://picsum.photos/id/64/64/64" />
      <div>{friend.name}</div>
    </li>
  )
}
