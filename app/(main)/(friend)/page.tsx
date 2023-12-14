import { cookies } from 'next/headers'
import ProfileImage from '@/components/ProfileImage'
import { verify } from '@/libs/jwt'
import { getUserRealname } from './actions'
import FriendHeader from './FriendHeader'
import FriendList from './FriendList'

export default async function Friends() {
  const token = cookies().get('access_token')
  if (!token) return []

  const payload = await verify(token.value)
  if (!payload) return []

  const username = payload.username as string
  const name = await getUserRealname(username)

  return (
    <>
      <FriendHeader username={username} />
      <section className="mb-6 flex select-none items-center gap-4 px-4 py-2 text-gray-800">
        <ProfileImage height={64} width={64} />
        <div>{name}</div>
      </section>
      <hr className="mx-4" />
      <FriendList username={username} />
    </>
  )
}
