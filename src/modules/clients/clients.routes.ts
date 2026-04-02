import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createClient, updateClient, deleteClient } from './clients.controller.js'

const router = Router()

router.post('/clients', createClient)
router.put('/clients/:id', authMiddleware, updateClient)
router.delete('/clients/:id', authMiddleware, deleteClient)

export default router