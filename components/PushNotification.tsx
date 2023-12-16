'use client'

import { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import ProfileImage from './ProfileImage'
import { socket } from '@/libs/socket'

interface Message {
  name: string
  username: string
  message: string
  fileUrl: string | null
  fileType: string | null
  time: string
}

interface Props {
  chatList: { id: number }[]
  username: string
}

export default function PushNotification({ chatList, username }: Props) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const nodeRef = useRef(null)

  useEffect(() => {
    chatList.forEach((chat) => {
      socket.emit('join', { roomId: chat.id })
    })
    socket.on('message', (message: Message) => {
      if (message.username === username) return
      timeoutId && clearTimeout(timeoutId)
      setShow(true)
      setName(message.name)
      if (message.message == '') {
        message.fileType === 'image'
          ? setMessage('사진을 보냈습니다.')
          : setMessage('동영상을 보냈습니다.')
      } else {
        setMessage(message.message)
      }
      const id = setTimeout(() => {
        setShow(false)
      }, 3000)
      setTimeoutId(id)
    })
    return () => {
      socket.off('message')
      timeoutId && clearTimeout(timeoutId)
    }
  })

  return (
    <section className="absolute inset-x-0 top-0 z-50">
      <Transition
        show={show}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-y-8"
        enterTo="translate-y-0"
        leave="transition ease-in duration-300 transform"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div
          ref={nodeRef}
          className="flex w-full items-center gap-3 rounded-t-xl bg-gray-400/25 p-4 backdrop-blur"
        >
          <ProfileImage height={48} width={48} />
          <div className="flex flex-col gap-1 text-gray-700">
            <h2 className="font-semibold">{name}</h2>
            <div className="text-sm">{message}</div>
          </div>
        </div>
      </Transition>
    </section>
  )
}
