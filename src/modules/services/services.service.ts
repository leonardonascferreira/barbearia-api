import { createService, findAllServices, findServiceById, updateService, deleteService } from './services.repository.js'

/**
 * Regras:
 * - name é obrigatório.
 * - price deve ser maior que zero.
 * - duration deve ser maior que zero (em minutos).
 */
async function createServiceService(name: string, price: number, duration: number) {
  if (!name) throw new Error('Nome é obrigatório')
  if (!price || price <= 0) throw new Error('Preço deve ser maior que zero')
  if (!duration || duration <= 0) throw new Error('Duração deve ser maior que zero')

  return createService(name, price, duration)
}

/** Retorna todos os serviços cadastrados. */
async function findAllServicesService() {
  return findAllServices()
}

/**
 * Campos não informados mantêm o valor atual.
 * Usa ?? (nullish coalescing) em vez de || para não descartar
 * valores números falsy como 0 acidentalmente.
 */
async function updateServiceService(id: number, name?: string, price?: number, duration?: number) {
  const current = await findServiceById(id)
  if (!current) throw new Error('Serviço não encontrado')

  // Valida apenas os campos que foram efetivamente fornecidos.
  if (price !== undefined && price <= 0) throw new Error('Preço deve ser maior que zero')
  if (duration !== undefined && duration <= 0) throw new Error('Duração deve ser maior que zero')

  return updateService(
    id,
    name ?? current.name,
    price ?? Number(current.price),
    duration ?? current.duration
  )
}

/**
 * Remove um serviço pelo ID.
 * Verifica a existência antes de deletar para retornar o erro claro.
 */
async function deleteServiceService(id: number) {
  const current = await findServiceById(id)
  if (!current) throw new Error('Serviço não encontrado')

  return deleteService(id)
}

export {
  createServiceService,
  findAllServicesService,
  updateServiceService,
  deleteServiceService
}
