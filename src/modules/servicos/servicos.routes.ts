import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createServico, deleteServico, findAllServicos, updateServico } from './servicos.controller.js'

const router = Router()

// rota pública para listar todos os serviços
router.get ('/servicos', findAllServicos)

// rotas protegidas - apenas barbeiros autenticados podem criar, atualizar e deletar
router.post ('/servicos', authMiddleware, createServico)
router.put ('/servicos/:id', authMiddleware, updateServico)
router.delete ('/servicos/:id', authMiddleware, deleteServico)

export default router