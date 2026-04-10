import prisma from '../../config/prisma.js'

/** Cria um novo serviço. */
async function createService(name: string, price: number, duration: number) {
  return prisma.service.create({
    data: { name, price, duration }
  })
}

/** Retorna todos os serviços cadastrados. */
async function findAllServices() {
  return prisma.service.findMany()
}

/** Busca serviço pelo ID. Retorna null se não encontrado. */
async function findServiceById(id: number) {
  return prisma.service.findUnique({ where: { id } })
}

/** Atualiza os dados de um serviço existente. */
async function updateService(id: number, name: string, price: number, duration: number) {
  return prisma.service.update({
    where: { id },
    data: { name, price, duration }
  })
}

/** Remove um serviço pelo ID
 * Lança erro no Prisma se o serviço não existir ou tiver agendamentos vinculados.
 */
async function deleteService(id: number) {
  return prisma.service.delete({ where: { id } })
}

export {
  createService,
  findAllServices,
  findServiceById,
  updateService,
  deleteService
}
