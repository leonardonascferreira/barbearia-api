import { Request, Response } from 'express'
import { loginBarberService } from './barbers.service.js'

/**
 * POST /login
 * 
 * Body esperado:
 *  { "email": "barbeiro@email.com", "password": "suaSenha" }
 * 
 * Resposta de sucesso (200):
 *  { "token": "<jwt>" }
 */
async function loginBarber(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const token = await loginBarberService(email, password)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

export { loginBarber }
