import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { router, createSocketServer } from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

const server = createServer(app)
createSocketServer(server)

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000')
})
