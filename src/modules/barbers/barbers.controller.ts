import { Request, Response } from 'express'
import { createBarberService, loginBarberService } from './barbers.service.js'

async function createBarber(req: Request, res: Response) {
  const { name, username, password } = req.body
  try {
    const barber = await createBarberService(name, username, password)
    res.json(barber)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

async function loginBarber(req: Request, res: Response) {
  const { username, password } = req.body
  try {
    const token = await loginBarberService(username, password)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

export { createBarber, loginBarber }