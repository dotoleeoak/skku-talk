import { Router } from 'express'

export * from './socket'
export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})
