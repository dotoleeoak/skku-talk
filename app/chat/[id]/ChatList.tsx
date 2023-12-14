'use client'

import { useEffect, useRef, useState } from 'react'
import { socket } from '@/libs/socket'
import MyChat from './MyChat'
import PartnerChat from './PartnerChat'
import { getMessages } from './actions'

interface Props {
  roomId: number
  username: string
}

interface Message {
  name: string
  username: string
  message: string
  time: string
}

export default function ChatList({ roomId, username }: Props) {
  const boxRef = useRef<HTMLElement>(null)
  const [messages, setMessages] = useState<Message[]>([])

  function scrollToBottom() {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
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
          return (
            <MyChat key={index} message={message.message} time={message.time} />
          )
        } else {
          return (
            <PartnerChat
              key={index}
              username={message.name}
              message={message.message}
              time={message.time}
            />
          )
        }
      })}
    </section>
  )
}
