'use client'

import ProfileImage from '@/components/ProfileImage'
import { useRouter } from 'next/navigation'

interface Props {
  id: number
  name: string
  lastMessage: string
  lastTime: Date | null
}

export default function ChatListItem({ id, name, lastMessage }: Props) {
  const router = useRouter()

  const openChatRoom = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <li
      className="relative flex h-20 cursor-pointer items-center gap-4 px-4 py-2 hover:bg-gray-50 active:bg-gray-100"
      onClick={openChatRoom}
    >
      <ProfileImage
        className="h-14 flex-none"
        src="https://picsum.photos/id/64/64/64"
      />
      <section className="flex flex-1 flex-col">
        <p className="text-lg font-medium">{name}</p>
        <p className="line-clamp-2 text-sm text-gray-500">{lastMessage}</p>
      </section>
      {lastMessage && (
        <div className="absolute right-4 top-4 text-xs text-gray-500">
          {lastMessage}
        </div>
      )}
    </li>
  )
}