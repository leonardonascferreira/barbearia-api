import { Request, Response } from 'express'
import { createServiceService, findAllServicesService, updateServiceService, deleteServiceService } from './services.service.js'

async function createService(req: Request, res: Response) {
  const { name, price, duration } = req.body
  try {
    const service = await createServiceService(name, price, duration)
    res.json(service)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function findAllServices(req: Request, res: Response) {
  try {
    const services = await findAllServicesService()
    res.json(services)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateService(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name, price, duration } = req.body
  try {
    const service = await updateServiceService(id, name, price, duration)
    res.json(service)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteService(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const service = await deleteServiceService(id)
    res.json(service)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createService, findAllServices, updateService, deleteService }