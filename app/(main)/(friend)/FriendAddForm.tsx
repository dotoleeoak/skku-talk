import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getUser, addFriend, isFriend, getChatRoomID } from './actions'
import { useState } from 'react'
import ProfileImage from '@/components/ProfileImage'
import { useRouter } from 'next/navigation'
import type { User } from '@prisma/client'

const schema = z.object({
  friendId: z.string().trim().min(1)
})

type FormState = z.infer<typeof schema>

interface Props {
  className?: string
  username: string
  close: () => void
}

export default function FriendAddForm({ className, username, close }: Props) {
  const { register, handleSubmit } = useForm<FormState>({
    resolver: zodResolver(schema),
    values: { friendId: '' }
  })

  const [userToAdd, setUserToAdd] = useState<Partial<User>>({})
  const [alreadyFriend, setAlreadyFriend] = useState(false)
  const [myself, setMyself] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const searchUser = handleSubmit(async (data) => {
    setUserToAdd({})
    setAlreadyFriend(false)
    setError('')
    setMyself(false)

    if (data.friendId === username) {
      setMyself(true)
      return
    }

    const user = await getUser(data.friendId)
    if (!user) {
      setError('존재하지 않는 사용자입니다.')
    } else {
      setAlreadyFriend(await isFriend(username, user.username))
      setUserToAdd(user)
    }
  })

  async function handleButton() {
    if (alreadyFriend) {
      const id = await getChatRoomID(username, userToAdd.username!)
      router.push(`/chat/${id}`)
    } else {
      await addFriend(username, userToAdd.username!)
      setUserToAdd({})
      router.refresh()
    }
    close()
  }

  return (
    <section
      className={clsx(
        'absolute right-0 flex w-[16rem] flex-col rounded-xl border bg-white p-4 text-left drop-shadow-lg',
        className
      )}
    >
      <h2 className="py-2 text-center font-bold">친구 추가</h2>
      <form onSubmit={searchUser} className="flex flex-col">
        <input
          type="text"
          className="border-x-0 border-b border-t-0 border-gray-300 pl-0 text-sm placeholder:text-gray-400 focus:border-b-gray-600"
          placeholder="친구 ID"
          {...register('friendId')}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      {myself && (
        <div className="flex flex-col items-center justify-between pb-2 pt-6">
          <span className="mt-2 text-sm text-gray-800">
            나 자신은 영원한 인생의 친구입니다.
          </span>
        </div>
      )}
      {userToAdd.name && (
        <div className="flex flex-col items-center justify-between pb-2 pt-6">
          <ProfileImage height={64} width={64} />
          <span className="mt-2 text-sm text-gray-800">{userToAdd.name}</span>
        </div>
      )}
      <button
        className="mt-4 rounded bg-main py-1.5 text-sm disabled:bg-gray-100 disabled:text-gray-400"
        disabled={!userToAdd.name}
        onClick={handleButton}
      >
        {alreadyFriend ? '1:1 채팅' : '친구 추가'}
      </button>
    </section>
  )
}
