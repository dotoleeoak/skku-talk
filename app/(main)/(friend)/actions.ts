'use server'

import prisma from '@/libs/db'

export async function getUserRealname(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      name: true
    }
  })
  return user?.name
}

export async function getFriends(username: string) {
  const friends = await prisma.friend.findMany({
    where: {
      user: {
        username
      },
      userId: 1
    },
    select: {
      id: true,
      friend: {
        select: {
          username: true,
          name: true
        }
      }
    }
  })
  return friends
}
