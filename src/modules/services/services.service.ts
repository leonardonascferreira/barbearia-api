import { createService, findAllServices, findServiceById, updateService, deleteService } from './services.repository.js'

async function createServiceService(name: string, price: number, duration: number) {
  if (!name) throw new Error('Name is required')
  if (!price || price <= 0) throw new Error('Price is required')
  if (!duration || duration <= 0) throw new Error('Duration is required')

  return createService(name, price, duration)
}

async function findAllServicesService() {
  return findAllServices()
}

async function updateServiceService(id: number, name: string, price: number, duration: number) {
  const current = await findServiceById(id)
  if (!current) throw new Error('Service not found')

  return updateService(
    id,
    name || current.name,
    price || Number(current.price),
    duration || current.duration
  )
}

async function deleteServiceService(id: number) {
  return deleteService(id)
}

export { createServiceService, findAllServicesService, updateServiceService, deleteServiceService }