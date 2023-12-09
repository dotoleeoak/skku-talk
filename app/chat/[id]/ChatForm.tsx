'use client'

import { useRef, useState } from 'react'
import MdiImageOutline from '~icons/mdi/image-outline'

interface Props {
  chatRoomId: number
}

export default function ChatForm({ chatRoomId }: Props) {
  // TODO: handle form submit
  const [value, setValue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function openFileDialog() {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  return (
    <form className="bg-white">
      <input type="hidden" name="chatRoomId" value={chatRoomId} />
      <textarea
        name="message"
        id="message"
        autoFocus
        className="block h-28 w-full resize-none border-none focus:ring-0"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex h-12 items-center justify-between px-4">
        <button
          onClick={openFileDialog}
          className="text-gray-500 hover:text-gray-500/80 active:text-gray-500/60"
        >
          <MdiImageOutline className="text-xl" />
        </button>
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*,video/*"
          multiple
        />
        <button
          type="submit"
          disabled={!value}
          className="rounded-md border-none bg-main px-5 py-1.5 text-sm disabled:bg-gray-100 disabled:text-gray-400"
        >
          전송
        </button>
      </div>
    </form>
  )
}
