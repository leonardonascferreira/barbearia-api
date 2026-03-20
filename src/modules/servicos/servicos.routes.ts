import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createServico, deleteServico, findAllServicos, updateServico } from './servicos.controller.js'

const router = Router()

router.get ('/servicos', findAllServicos)
router.post ('/servicos', authMiddleware, createServico)
router.put ('/servicos/:id', authMiddleware, updateServico)
router.delete ('/servicos/:id', authMiddleware, deleteServico)

export default router