import { Request, Response } from 'express'
import {
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  findAppointmentsByDateService,
  getAvailabilityService
} from './appointments.service.js'

/**
 * Cria um agendamento sem exigir clientId pré-existente.
 * O backend localiza ou cria o cliente automaticamente por telefone.
 */
async function createAppointment(req: Request, res: Response) {
  const { scheduledAt, barberId, serviceId, clientPhone, clientName, clientEmail } = req.body
  try {
    const appointment = await createAppointmentService(
    new Date(scheduledAt), 
    Number(barberId), 
    Number(serviceId),
    clientPhone,
    clientName,
    clientEmail
  )
  res.status(201).json(appointment)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Atualiza o status de um agendamento.
 * Apenas transições válidas são aceitas.
 */
async function updateAppointment(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ message: 'Status é obrigatório '})
  }
  
  try {
    const appointment = await updateAppointmentService(id, status)
    res.json(appointment)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Remove um agendamento permanentemente.
 */
async function deleteAppointment(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    await deleteAppointmentService(id)
    res.json({ message: 'Agendamento removido com sucesso' })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Retorna todos os agendamentos de um dia específico,
 * ordenados por horário crescente.
 */
async function getAppointmentsByDate(req: Request, res: Response) {
  const rawDate = req.query.date as string
  
  if (!rawDate) {
    return res.status(400).json({ message: 'O parâmetro date é obrigatório' })
  }

  const date = new Date(rawDate)
  if (isNaN(date.getTime())) {
    return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD' })
  }

  try {
    const appointments = await findAppointmentsByDateService(date)
    res.json(appointments)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

/**
 * Retorna os horários disponíveis para agendamento em um dia específico,
 * considerando a duração do serviço e os agendamentos já existentes.
 */
async function getAvailability(req: Request, res: Response) {
  const rawDate = req.query.date as string
  const barberId = Number(req.query.barberId)
  const serviceId = Number(req.query.serviceId)

  if (!rawDate || !barberId || !serviceId ) {
    return res.status(400).json({ message: 'Parâmetros obrigátorios: date, barberId, serviceId'})
  }
  
  const date = new Date(rawDate)
  if (isNaN(date.getTime())) {
    return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD'})
  }
  
  try {
    const slots = await getAvailabilityService(date, barberId, serviceId)
    res.json(slots)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}

export {
  createAppointment,
  updateAppointment,
  deleteAppointment, 
  getAppointmentsByDate,
  getAvailability
}
