'use server'

import prisma from '@/libs/db'

export async function getChatRoomUsers(chatRoomId: number) {
  const chatRoom = await prisma.chatRoom.findUnique({
    where: {
      id: chatRoomId
    },
    select: {
      ChatRoomUsers: {
        select: {
          user: {
            select: {
              username: true,
              name: true
            }
          }
        }
      }
    }
  })

  const chatRoomUsers =
    chatRoom?.ChatRoomUsers.map(({ user }) => ({
      username: user.username,
      name: user.name
    })) ?? []

  return chatRoomUsers
}

export async function getMessages(chatRoomId: number) {
  const messages = await prisma.chatMessage.findMany({
    where: {
      chatRoomId
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          name: true
        }
      }
    }
  })

  const messagesWithTime = messages.map(({ user, message, createdAt }) => ({
    username: user.name,
    message: message,
    time: createdAt.toLocaleString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }))

  return messagesWithTime
}
