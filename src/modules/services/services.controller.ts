import { Request, Response } from 'express'
import { createServiceService, findAllServicesService, updateServiceService, deleteServiceService } from './services.service.js'

/** Body esperado:
 *  { "name": "Corte", "price": 35.00, "duration": 30 }
 * 
 * duration em minutos.
 */
async function createService(req: Request, res: Response) {
  const { name, price, duration } = req.body
  try {
    const service = await createServiceService(name, price, duration)
    res.status(201).json(service)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Retorna a lista de todos os serviços disponíveis.
 * Rota pública - o cliente pode consultar sem autenticação.
 */
async function findAllServices(req: Request, res: Response) {
  try {
    const services = await findAllServicesService()
    res.json(services)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Todos os campos do body são opcionais - apenas os informados serão atualizados.
 */
async function updateService(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name, price, duration } = req.body
  try {
    const service = await updateServiceService(id, name, price, duration)
    res.json(service)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Remove um serviço. Retorna erro se não encontrado ou se possuir
 * agendamentos vinculados (restrição de chave estrangeira do banco).
 */
async function deleteService(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    await deleteServiceService(id)
    res.json({ message: 'Serviço removido com sucesso' })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

export { createService, findAllServices, updateService, deleteService }
