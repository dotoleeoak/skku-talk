import { getFriends } from './actions'
import FriendListItem from './FriendListItem'

interface Props {
  username: string
}

export default async function FriendList({ username }: Props) {
  const friends = await getFriends(username)

  return (
    <section>
      <h2 className="px-5 py-2 text-xs text-gray-500">
        친구 {friends.length}명
      </h2>
      <ul>
        {friends.map(({ id, friend }) => (
          <FriendListItem key={id} friend={friend} username={username} />
        ))}
      </ul>
    </section>
  )
}
