import prisma from '../../config/prisma.js'

/** Cria um novo cliente. Email é opcional. */
async function createClient(name: string, phone: string, email?: string) {
  return prisma.client.create({
    data: { name, phone, email }
  })
}

/** Busca cliente pelo telefone único. Retonar null se não encontrado. */
async function findClientByPhone(phone: string) {
  return prisma.client.findUnique({ where: { phone } })
}

/** Busca cliente pelo e-mail único. Retorna null se não encontrado. */
async function findClientByEmail(email: string) {
  return prisma.client.findUnique({ where: { email }})
}

/** Busca cliente pelo ID único. Retorna null se não encontrado. */
async function findClientById(id: number) {
  return prisma.client.findUnique({ where: { id } })
}

/** Atualiza os dados de um cliente existente. */
async function updateClient(id: number, name: string, phone: string, email: string) {
  return prisma.client.update({
    where: { id },
    data: { name, phone, email }
  })
}

/**
 * Remove um cliente pelo ID.
 * Lança erro do Prisma se o cliente não existir ou tiver agendamentos vinculados.
 */
async function deleteClient(id: number) {
  return prisma.client.delete({ where: { id } })
}

export {
  createClient,
  findClientByPhone,
  findClientByEmail,
  findClientById,
  updateClient,
  deleteClient
}
