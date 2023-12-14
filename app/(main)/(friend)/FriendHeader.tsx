'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import MdiAccountPlusOutline from '~icons/mdi/account-plus-outline'
import MdiCogOutline from '~icons/mdi/cog-outline'
import FriendAddForm from './FriendAddForm'

interface Props {
  username: string
}

export default function Header({ username }: Props) {
  const [showFriendForm, setShowFriendForm] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const toggleFriendForm = () => setShowFriendForm((prev) => !prev)
  const toggleShowLogout = () => setShowLogout((prev) => !prev)
  const friendButtonRef = useRef(null)
  const settingButtonRef = useRef(null)
  useClickAway(friendButtonRef, () => setShowFriendForm(false))
  useClickAway(settingButtonRef, () => setShowLogout(false))

  const router = useRouter()

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login') // workaround: `redirect` doesn't work (Next.js bug)
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between rounded-t-xl bg-white/50 p-6 backdrop-blur">
      <h1 className="text-2xl font-semibold">친구</h1>
      <div className="flex gap-3">
        <div ref={friendButtonRef} className="relative">
          <MdiAccountPlusOutline
            onClick={toggleFriendForm}
            className="cursor-pointer text-2xl text-gray-700 hover:text-gray-700/80 active:text-gray-700/60"
          />
          {showFriendForm && (
            <FriendAddForm
              username={username}
              close={() => setShowFriendForm(false)}
            />
          )}
        </div>
        <div ref={settingButtonRef} className="relative">
          <MdiCogOutline
            onClick={toggleShowLogout}
            className="cursor-pointer text-2xl text-gray-700 hover:text-gray-700/80 active:text-gray-700/60"
          />
          {showLogout && (
            <section
              onClick={logout}
              className="absolute right-0 w-24 rounded border bg-white p-2 text-left text-sm drop-shadow-lg hover:bg-white/80 active:bg-white/60"
            >
              로그아웃
            </section>
          )}
        </div>
      </div>
    </header>
  )
}
