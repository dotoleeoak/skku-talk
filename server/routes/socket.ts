import type { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import prisma from '../../libs/db'

const createSocketServer = (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    socket.on('join', async ({ roomId }) => {
      socket.join(roomId)
    })

    socket.on('message', async ({ username, roomId, message }) => {
      const chat = await prisma.chatMessage.create({
        data: {
          message,
          ChatRoom: {
            connect: {
              id: roomId
            }
          },
          user: {
            connect: {
              username
            }
          }
        },
        include: {
          user: true
        }
      })

      io.to(roomId).emit('message', {
        name: chat.user.name,
        username,
        message,
        time: chat.createdAt.toLocaleString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      })
    })
  })
}

export { createSocketServer }
