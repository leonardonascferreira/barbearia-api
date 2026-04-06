import { findBarberById } from '../barbers/barbers.repository.js'
import { findClientById } from '../clients/clients.repository.js'
import { findServiceById } from '../services/services.repository.js'
import { createAppointment, updateAppointment, deleteAppointment, findAppointmentByDateAndBarber, findAppointmentsByDate } from './appointments.repository.js'

async function createAppointmentService(scheduledAt: Date, clientId: number, barberId: number, serviceId: number) {
  if (scheduledAt < new Date()) throw new Error('Date cannot be in the past')

  const conflict = await findAppointmentByDateAndBarber(scheduledAt, barberId)
  if (conflict) throw new Error('Time slot already booked')

  const barber = await findBarberById(barberId)
  if (!barber) throw new Error('Barber not found')

  const service = await findServiceById(serviceId)
  if (!service) throw new Error('Service not found')

  const cliente = await findClientById(clientId)
  if (!cliente) throw new Error('Cliente not found')

  return createAppointment(scheduledAt, 'pending', clientId, barberId, serviceId)
}

async function updateAppointmentService(id: number, status: string) {
  return updateAppointment(id, status)
}

async function deleteAppointmentService(id: number) {
  return deleteAppointment(id)
}

async function findAppointmentsByDateService(date: Date) {
  return findAppointmentsByDate(date)
}

export { createAppointmentService, updateAppointmentService, deleteAppointmentService, findAppointmentsByDateService }