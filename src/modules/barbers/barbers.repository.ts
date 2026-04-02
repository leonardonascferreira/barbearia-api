import prisma from '../../config/prisma.js'

async function createBarber(name: string, username: string, password: string) {
  return prisma.barber.create({
    data: { name, username, password }
  })
}

async function findBarberByUsername(username: string) {
  return prisma.barber.findUnique({
    where: { username }
  })
}

async function findBarberById(id: number) {
  return prisma.barber.findUnique({
    where: { id }
  })
}

export { createBarber, findBarberByUsername, findBarberById }