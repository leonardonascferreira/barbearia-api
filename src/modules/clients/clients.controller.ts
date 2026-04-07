import { Request, Response } from 'express'
import { createClientService, updateClientService, deleteClientService } from './clients.service.js'


/**
 * Body esperado:
 *  { "name": "João", "phone": "11999999999", "email": "joao@email.com" }
 * 
 * email é opcional.
 */
async function createClient(req: Request, res: Response) {
  const { name, phone, email } = req.body
  try {
    const client = await createClientService(name, phone, email)
    res.status(201).json(client)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Todos os campos do body são opcionais - apenas os informados serão atualizados.
 */
async function updateClient(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name, phone, email } = req.body
  try {
    const client = await updateClientService(id, name, phone, email)
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Remove o cliente. Retorna o erro se não encontrado ou possuir
 * agendamentos vinculados (restrição de chave estrangeira do banco).
 */
async function deleteClient(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    await deleteClientService(id)
    res.json({ message: 'Cliente removido com sucesso' })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

export { createClient, updateClient, deleteClient }
