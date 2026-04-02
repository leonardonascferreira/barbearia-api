import prisma from '../../config/prisma.js'

async function createService(name: string, price: number, duration: number) {
  return prisma.service.create({
    data: { name, price, duration }
  })
}

async function findAllServices() {
  return prisma.service.findMany()
}

async function findServiceById(id: number) {
  return prisma.service.findUnique({ where: { id } })
}

async function updateService(id: number, name: string, price: number, duration: number) {
  return prisma.service.update({
    where: { id },
    data: { name, price, duration }
  })
}

async function deleteService(id: number) {
  return prisma.service.delete({ where: { id } })
}

export { createService, findAllServices, findServiceById, updateService, deleteService }