import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'
import router from './routes'

const app = express()
app.use(express.json())
app.use(router)

const server = createServer(app)
const io = new Server(server)

const prisma = new PrismaClient()

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('join', async ({ chatRoomId }) => {
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

    socket.join(chatRoomId.toString())
    socket.emit('join', chatRoomUsers)
  })
})

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000')
})
