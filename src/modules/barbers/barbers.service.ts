import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createBarber, findBarberByUsername } from './barbers.repository.js'

async function createBarberService(name: string, username: string, password: string) {
  const exists = await findBarberByUsername(username)
  if (exists) throw new Error('Username already registered')

  const hashedPassword = await bcrypt.hash(password, 10)
  return createBarber(name, username, hashedPassword)
}

async function loginBarberService(username: string, password: string) {
  const barber = await findBarberByUsername(username)
  if (!barber) throw new Error('Username not found')

  const match = await bcrypt.compare(password, barber.password)
  if (!match) throw new Error('Invalid password')

  return jwt.sign({ id: barber.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })
}

export { createBarberService, loginBarberService }