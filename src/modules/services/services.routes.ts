import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createService, findAllServices, updateService, deleteService } from './services.controller.js'

const router = Router()

/** Lista todos os serviços disponíveis (público). */
router.get('/services', findAllServices)

/** Cria um novo serviço (requer autenticação). */
router.post('/services', authMiddleware, createService)

/** Atualiza um serviço (requer autenticação). */
router.put('/services/:id', authMiddleware, updateService)

/** Remove um serviço (requer autenticação). */
router.delete('/services/:id', authMiddleware, deleteService)

export default router
