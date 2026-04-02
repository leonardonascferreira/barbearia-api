import prisma from '../../config/prisma.js'

async function createClient(name: string, phone: string, email: string) {
  return prisma.client.create({
    data: { name, phone, email }
  })
}

async function findClientByPhone(phone: string) {
  return prisma.client.findUnique({ where: { phone } })
}

async function findClientById(id: number) {
  return prisma.client.findUnique({ where: { id } })
}

async function updateClient(id: number, name: string, phone: string, email: string) {
  return prisma.client.update({
    where: { id },
    data: { name, phone, email }
  })
}

async function deleteClient(id: number) {
  return prisma.client.delete({ where: { id } })
}

export { createClient, findClientByPhone, findClientById, updateClient, deleteClient }