import { Router } from 'express'
import { createAgendamento, updateAgendamento, deleteAgendamento } from './agendamentos.controller.js'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'

const router = Router()

// rota pública para criar um agendamento
router.post('/agendamentos', createAgendamento)

// rotas protegidas - apenas barbeiros autenticados podem atualizar e deletar
router.put('/agendamentos/:id', authMiddleware, updateAgendamento)
router.delete('/agendamentos/:id', authMiddleware, deleteAgendamento)

export default router