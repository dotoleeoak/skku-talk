'use client'

import { useRouter } from 'next/navigation'
import MdiArrowLeft from '~icons/mdi/arrow-left'

export default function GoBackButton() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      <MdiArrowLeft className="text-2xl text-gray-700 hover:text-gray-700/75 active:text-gray-700/50" />
    </button>
  )
}
