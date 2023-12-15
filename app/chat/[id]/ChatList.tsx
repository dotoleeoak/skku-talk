'use client'

import { useEffect, useRef, useState } from 'react'
import { socket } from '@/libs/socket'
import MyChat from './MyChat'
import PartnerChat from './PartnerChat'
import { getMessages } from './actions'
import Image from 'next/image'

interface Props {
  roomId: number
  username: string
}

interface Message {
  name: string
  username: string
  message: string
  fileUrl: string | null
  fileType: string | null
  time: string
}

export default function ChatList({ roomId, username }: Props) {
  const boxRef = useRef<HTMLElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  function scrollToBottom() {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }

  function showImage(image: string) {
    setShowImagePreview(true)
    setImageSrc(image)
  }

  function closeImage() {
    setShowImagePreview(false)
  }

  useEffect(() => {
    getMessages(roomId).then((data) => setMessages(data))
    socket.emit('join', { roomId })
    socket.on('message', (newMessage: Message) => {
      setMessages((messages) => [...messages, newMessage])
    })

    return () => {
      socket.off('message')
    }
  }, [roomId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <section
      ref={boxRef}
      className="h-[calc(100%-14rem)] overflow-y-scroll py-2"
    >
      {messages.map((message, index) => {
        if (message.username === username) {
          return <MyChat key={index} message={message} showImage={showImage} />
        } else {
          return (
            <PartnerChat key={index} message={message} showImage={showImage} />
          )
        }
      })}
      {showImagePreview && (
        <div
          className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/50"
          onClick={closeImage}
        >
          <Image src={imageSrc} alt="이미지" height="500" width="500" />
        </div>
      )}
    </section>
  )
}
