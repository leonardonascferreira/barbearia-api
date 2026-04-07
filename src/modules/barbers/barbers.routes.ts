/**
 * Apenas o login é exposto publicamente.
 * O cadastro do barbeiro é realizado via seed, não por rota HTTP,
 * para impedir que usuários externos criem contas administrativas.
 */

import { Router } from 'express'
import { loginBarber } from './barbers.controller.js'

const router = Router()

/** Autentica o barbeiro e retorna um token JWT. */
router.post('/login', loginBarber)

export default router
