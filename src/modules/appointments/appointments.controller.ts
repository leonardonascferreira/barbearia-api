import { Request, Response } from 'express'
import { createAppointmentService, updateAppointmentService, deleteAppointmentService, findAppointmentsByDateService } from './appointments.service.js'

async function createAppointment(req: Request, res: Response) {
  const { scheduledAt, clientId, barberId, serviceId } = req.body
  try {
    const appointment = await createAppointmentService(new Date(scheduledAt), clientId, barberId, serviceId)
    res.json(appointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateAppointment(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { status } = req.body
  try {
    const appointment = await updateAppointmentService(id, status)
    res.json(appointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteAppointment(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const appointment = await deleteAppointmentService(id)
    res.json(appointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function getAppointmentsByDate(req: Request, res: Response) {
  const date = new Date(req.query.date as string)
  try {
    const appointments = await findAppointmentsByDateService(date)
    res.json(appointments)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { createAppointment, updateAppointment, deleteAppointment, getAppointmentsByDate }