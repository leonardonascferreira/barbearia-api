import { createClient, findClientByPhone, findClientByEmail, findClientById, updateClient, deleteClient } from './clients.repository.js'


/**
 * Regra:
 * - name e phone são obrigatórios.
 * - telefone deve ser único no sistema.
 * - e-mail é opcional, mas se informado, deve ser único.
 */
async function createClientService(name: string, phone: string, email?: string) {
  if (!name) throw new Error('Nome é obrigatório')
  if (!phone) throw new Error('Telefone é obrigatório')

  const phoneExists = await findClientByPhone(phone)
  if (phoneExists) throw new Error('Telefone já cadastrado')

  if (email) {
    const emailExists = await findClientByEmail(email)
    if (emailExists) throw new Error('E-mail já cadastrado')
  }

  return createClient(name, phone, email)
}

/**
 * Campos não informados mantêm o valor atual (uso de ?? ao invés de ||,
 * para não descartar valores falsy válidos como "" intencional).
 */
async function updateClientService(id: number, name?: string, phone?: string, email?: string) {
  const current = await findClientById(id)
  if (!current) throw new Error('Cliente não encontrado')

  // Valida unicidade do novo telefone, caso seja diferente do atual
  if (phone && phone !== current.phone) {
    const phoneExists = await findClientByPhone(phone)
    if (phoneExists) throw new Error('Telefone já cadastrado por outro cliente')
  }

  // Valida unicidade do novo e-mail, caso seja diferente do atual
  if (email && email !== current.email) {
    const emailExists = await findClientByEmail(email)
    if (emailExists) throw new Error ('E-mail já cadastrado por outro cliente')
  }

  return updateClient(
    id,
    name ?? current.name,
    phone ?? current.phone,
    email ?? current.email ?? undefined
  )
}

/**
 * Remove um cliente pelo ID.
 * Verifica a existência antes de deletar para retornar o erro claro.
 */
async function deleteClientService(id: number) {
  const current = await findClientById(id)
  if (!current) throw new Error('Cliente não encontrado')

  return deleteClient(id)
}

export { createClientService, updateClientService, deleteClientService }
