import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findBarberByEmail } from './barbers.repository.js'


/**
 * Autentica o barbeiro comparando o e-mail e senha.
 * 
 * @returns Token JWT com validade de 1 dia.
 * @throws Erro com mensagem amigável para credenciais inválidas.
 */
async function loginBarberService(email: string, password: string) {
  const barber = await findBarberByEmail(email)
  if (!barber) throw new Error('E-mail não encontrado')

  const match = await bcrypt.compare(password, barber.password)
  if (!match) throw new Error('Senha inválida')

  // O payload do token carrega apenas o ID para minizar exposição de dados.
  return jwt.sign({ id: barber.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })
}

export { loginBarberService }
