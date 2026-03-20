import { Router } from 'express'
import { createBarbeiro, loginBarbeiro } from './barbeiros.controller.js'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'

// cria uma instância do router
const router = Router()

// define a rota POST /barbeiros
router.post ('/barbeiros', createBarbeiro)

// define a rota POST /login 
router.post ('/login', loginBarbeiro)

export default router