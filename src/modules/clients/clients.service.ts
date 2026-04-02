import { createClient, findClientByPhone, findClientById, updateClient, deleteClient } from './clients.repository.js'

async function createClientService(name: string, phone: string, email: string) {
  if (!name) throw new Error('Name is required')
  if (!phone) throw new Error('Phone is required')

  const exists = await findClientByPhone(phone)
  if (exists) throw new Error('Phone already registered')

  return createClient(name, phone, email)
}

async function updateClientService(id: number, name: string, phone: string, email: string) {
  const current = await findClientById(id)
  if (!current) throw new Error('Client not found')

  return updateClient(
    id,
    name || current.name,
    phone || current.phone,
    email || current.email
  )
}

async function deleteClientService(id: number) {
  return deleteClient(id)
}

export { createClientService, updateClientService, deleteClientService }