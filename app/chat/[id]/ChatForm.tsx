'use client'

import { useRef, type KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { socket } from '@/libs/socket'
import MdiImageOutline from '~icons/mdi/image-outline'
import MdiPlayBoxOutline from '~icons/mdi/play-box-outline'
import { getPresignedUrl } from './actions'

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
  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<ChatForm>({
      resolver: zodResolver(schema),
      values: { message: '', roomId, username }
    })

  function openImageDialog() {
    imageRef.current?.click()
  }

  function openVideoDialog() {
    videoRef.current?.click()
  }

  async function uploadFile(file: File, type: 'image' | 'video') {
    if (file.size > 1024 * 1024 * 10) {
      throw new Error('10MB 이하의 파일만 업로드할 수 있습니다.')
    }
    const now = new Date()
    const filename = [
      'SKKU_Talk',
      type.charAt(0).toUpperCase() + type.slice(1),
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    ].join('_')

    const key = `${type}/${filename}.${file.type.split('/')[1]}`
    const url = await getPresignedUrl(key)
    await fetch(url, {
      method: 'PUT',
      body: file,
      mode: 'cors',
      headers: { 'Content-Type': file.type }
    })

    return url.split('?')[0]
  }

  async function uploadImage() {
    const file = imageRef.current?.files?.item(0)
    if (!file) return
    try {
      const url = await uploadFile(file, 'image')
      socket.emit('file', { url, roomId, username, type: 'image' })
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      }
    }
  }

  async function uploadVideo() {
    const file = videoRef.current?.files?.item(0)
    if (!file) return
    try {
      const url = await uploadFile(file, 'video')
      socket.emit('file', { url, roomId, username, type: 'video' })
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      }
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
      <div className="flex h-12 items-center gap-4 px-4">
        <button
          type="button"
          onClick={openImageDialog}
          className="text-gray-500 hover:text-gray-500/80 active:text-gray-500/60"
        >
          <MdiImageOutline className="text-xl" />
        </button>
        <button
          type="button"
          onClick={openVideoDialog}
          className="text-gray-500 hover:text-gray-500/80 active:text-gray-500/60"
        >
          <MdiPlayBoxOutline className="text-xl" />
        </button>
        <input
          type="file"
          hidden
          ref={imageRef}
          accept="image/*"
          onChange={uploadImage}
        />
        <input
          type="file"
          hidden
          ref={videoRef}
          accept="video/*"
          onChange={uploadVideo}
        />
        <button
          type="submit"
          disabled={!watch('message')}
          className="ml-auto rounded-md border-none bg-main px-5 py-1.5 text-sm hover:bg-main/80 active:bg-main/60 disabled:bg-gray-100 disabled:text-gray-400"
        >
          전송
        </button>
      </div>
    </form>
  )
}
