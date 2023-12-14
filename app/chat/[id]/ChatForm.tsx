'use client'

import { useRef, type KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { socket } from '@/libs/socket'
import MdiImageOutline from '~icons/mdi/image-outline'

interface Props {
  roomId: number
  username: string
}

const schema = z.object({
  username: z.string(),
  roomId: z.number(),
  message: z.string().trim().min(1)
})

type ChatForm = z.infer<typeof schema>

export default function ChatForm({ roomId, username }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, watch, resetField } = useForm<ChatForm>({
    resolver: zodResolver(schema),
    values: { message: '', roomId, username }
  })

  function openFileDialog() {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  function uploadFile() {
    const length = fileRef.current?.files?.length ?? 0
    for (let i = 0; i < length; i++) {
      const file = fileRef.current?.files?.item(i)
      // TODO: send file to server socket
    }
  }

  function keyDownHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
    // EDGE CASE: IME composition
    if (e.keyCode == 229) return

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const onSubmit = handleSubmit((data) => {
    socket.emit('message', data)
    resetField('message')
  })

  return (
    <form className="bg-white" onSubmit={onSubmit}>
      <textarea
        id="message"
        autoFocus
        className="block h-28 w-full resize-none border-none p-4 focus:ring-0"
        onKeyDown={keyDownHandler}
        {...register('message')}
      />
      <div className="flex h-12 items-center justify-between px-4">
        <button
          type="button"
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
          onChange={uploadFile}
        />
        <button
          type="submit"
          disabled={!watch('message')}
          className="rounded-md border-none bg-main px-5 py-1.5 text-sm hover:bg-main/80 active:bg-main/60 disabled:bg-gray-100 disabled:text-gray-400"
        >
          전송
        </button>
      </div>
    </form>
  )
}
