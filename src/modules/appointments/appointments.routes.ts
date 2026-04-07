import { Router } from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.js'
import { createAppointment, updateAppointment, deleteAppointment, getAppointmentsByDate } from './appointments.controller.js'

const router = Router()

router.post('/appointments', createAppointment)
router.put('/appointments/:id', authMiddleware, updateAppointment)
router.delete('/appointments/:id', authMiddleware, deleteAppointment)
router.get('/appointments', authMiddleware, getAppointmentsByDate)

export default router
