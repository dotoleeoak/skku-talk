'use server'

import prisma from '@/libs/db'

export async function getUser(username: string) {
  const friend = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      username: true,
      name: true
    }
  })
  return friend
}

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
      }
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

export async function getChatRoomID(username: string, friend: string) {
  const chatRoom = await prisma.chatRoom.findFirst({
    where: {
      ChatRoomUsers: {
        every: {
          user: {
            username: {
              in: [username, friend]
            }
          }
        }
      }
    },
    select: {
      id: true
    }
  })

  if (!chatRoom) {
    const { id } = await prisma.chatRoom.create({
      data: {
        ChatRoomUsers: {
          create: [
            {
              user: {
                connect: {
                  username
                }
              }
            },
            {
              user: {
                connect: {
                  username: friend
                }
              }
            }
          ]
        }
      }
    })
    return id
  }

  return chatRoom.id
}

export async function isFriend(username: string, friend: string) {
  const isFriend = await prisma.friend.findFirst({
    where: {
      user: {
        username
      },
      friend: {
        username: friend
      }
    }
  })

  return !!isFriend
}

export async function addFriend(username: string, friend: string) {
  await prisma.friend.create({
    data: {
      user: {
        connect: {
          username
        }
      },
      friend: {
        connect: {
          username: friend
        }
      }
    }
  })

  return true
}
