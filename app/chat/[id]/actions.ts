'use server'

import prisma from '@/libs/db'
import { s3client } from '@/libs/s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

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
      fileUrl: true,
      fileType: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          name: true
        }
      }
    }
  })

  const messagesWithTime = messages.map((m) => ({
    name: m.user.name,
    username: m.user.username,
    message: m.message,
    fileUrl: m.fileUrl,
    fileType: m.fileType,
    time: m.createdAt.toLocaleString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }))

  return messagesWithTime
}

export async function getPresignedUrl(key: string) {
  const command = new PutObjectCommand({ Bucket: 'skku-chat', Key: key })
  return getSignedUrl(s3client, command, { expiresIn: 60 * 60 * 24 })
}
