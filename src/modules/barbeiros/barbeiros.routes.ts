import { Router } from 'express'
import { createBarbeiro, loginBarbeiro } from './barbeiros.controller.js'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'

const router = Router()

// rotas públicas para create e login
router.post ('/barbeiros', createBarbeiro)
router.post ('/login', loginBarbeiro)

export default router