import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { faker } from '@faker-js/faker/locale/ko'

const prisma = new PrismaClient()

async function main() {
  const userJaemin = await prisma.user.create({
    data: {
      username: 'jaemin',
      password: await hash('qwer1234'),
      name: '최재민'
    }
  })

  const userAlice = await prisma.user.create({
    data: {
      username: 'alice',
      password: await hash('qwer1234'),
      name: '앨리스'
    }
  })

  const userBob = await prisma.user.create({
    data: {
      username: 'bob',
      password: await hash('qwer1234'),
      name: '밥'
    }
  })

  await prisma.friend.create({
    data: {
      userId: userJaemin.id,
      friendId: userAlice.id
    }
  })

  await prisma.friend.create({
    data: {
      userId: userJaemin.id,
      friendId: userBob.id
    }
  })

  for (let i = 1; i <= 10; i++) {
    await prisma.user.create({
      data: {
        username: `user${i}`,
        password: await hash('qwer1234'),
        name: faker.person.lastName() + faker.person.firstName()
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
