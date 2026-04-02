import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createService, findAllServices, updateService, deleteService } from './services.controller.js'

const router = Router()

router.get('/services', findAllServices)
router.post('/services', authMiddleware, createService)
router.put('/services/:id', authMiddleware, updateService)
router.delete('/services/:id', authMiddleware, deleteService)

export default router