import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createClient, updateClient, deleteClient } from './clients.controller.js'

const router = Router()

/** Cadastra um novo cliente (público). */
router.post('/clients', createClient)

/** Atualiza os dados de um cliente (requer autenticação). */
router.put('/clients/:id', authMiddleware, updateClient)

/** Remove um cliente (requer autenticação). */
router.delete('/clients/:id', authMiddleware, deleteClient)

export default router
