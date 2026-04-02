import { Request, Response } from 'express'
import { createClientService, updateClientService, deleteClientService } from './clients.service.js'

async function createClient(req: Request, res: Response) {
  const { name, phone, email } = req.body
  try {
    const client = await createClientService(name, phone, email)
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateClient(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name, phone, email } = req.body
  try {
    const client = await updateClientService(id, name, phone, email)
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteClient(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const client = await deleteClientService(id)
    res.json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createClient, updateClient, deleteClient }