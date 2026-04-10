import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAvailability
} from './appointments.controller.js'

const router = Router()

/** Cria um agendamento (público - cliente agenda sem login). */
router.post('/appointments', createAppointment)

/** 
 * Retorna horários disponíveis para um dia, barbeiro e serviço.
 * Público - necessário para o cliente escolher o horário antes de agendar.
 */
router.get('/availability', getAvailability)

/** 
 * Lista agendamentos de um dia (requer autenticação).
 */
router.get('/appointments', authMiddleware, getAppointmentsByDate)

/** Atualiza o status de um agendamento (requer autenticação). */
router.put('/appointments/:id', authMiddleware, updateAppointment)

/** Remove um agendamento (requer autenticação). */
router.delete('/appointments/:id', authMiddleware, deleteAppointment)



export default router
