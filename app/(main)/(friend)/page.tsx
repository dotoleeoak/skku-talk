import { cookies } from 'next/headers'
import ProfileImage from '@/components/ProfileImage'
import { verify } from '@/libs/jwt'
import { getFriends, getUserRealname } from './actions'
import FriendHeader from './FriendHeader'
import FriendListItem from './FriendListItem'

export default async function Friends() {
  const token = cookies().get('access_token')
  if (!token) return []

  const payload = await verify(token.value)
  if (!payload) return []

  const username = payload.username as string
  const name = await getUserRealname(username)
  const friends = await getFriends(username)

  return (
    <>
      <FriendHeader />
      <section className="flex items-center gap-4 border-b p-4 text-gray-800">
        <ProfileImage
          className="h-16"
          src="https://picsum.photos/id/64/64/64"
        />
        <div>{name}</div>
      </section>
      <h2 className="p-2 text-xs text-gray-500">친구 {friends.length}명</h2>
      <ul>
        {friends.map(({ id, friend }) => (
          <FriendListItem key={id} friend={friend} username={username} />
        ))}
      </ul>
    </>
  )
}
