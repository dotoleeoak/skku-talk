'use server'

import prisma from '@/libs/db'

export async function getChatRooms(username: string) {
  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      ChatRoomUsers: {
        some: {
          user: {
            username
          }
        }
      }
    },
    select: {
      id: true,
      name: true,
      ChatRoomUsers: {
        where: {
          user: {
            username: {
              not: username
            }
          }
        },
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      },
      ChatMessage: {
        select: {
          message: true,
          createdAt: true,
          fileType: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  })
  return chatRooms
}
