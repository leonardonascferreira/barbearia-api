import prisma from '../../config/prisma.js'

/** 
 * Busca barbeiro pelo e-mail único.
 * Retorna null se não encontrado.
 */
async function findBarberByEmail(email: string) {
  return prisma.barber.findUnique({ where: { email } })
}

/**
 * Busca barbeiro pelo ID.
 * Retorna null se não encontrado
 */
async function findBarberById(id: number) {
  return prisma.barber.findUnique({ where: { id } })
}

export { findBarberByEmail, findBarberById }
