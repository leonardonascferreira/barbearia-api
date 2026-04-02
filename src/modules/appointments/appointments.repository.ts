import prisma from '../../config/prisma.js'

async function createAppointment(scheduledAt: Date, status: string, clientId: number, barberId: number, serviceId: number) {
  return prisma.appointment.create({
    data: { scheduledAt, status, clientId, barberId, serviceId }
  })
}

async function findAppointmentsByDate(scheduledAt: Date) {
  return prisma.appointment.findMany({ where: { scheduledAt } })
}

async function findAppointmentByDateAndBarber(scheduledAt: Date, barberId: number) {
  return prisma.appointment.findFirst({ where: { scheduledAt, barberId } })
}

async function updateAppointment(id: number, status: string) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  })
}

async function deleteAppointment(id: number) {
  return prisma.appointment.delete({ where: { id } })
}

export { createAppointment, findAppointmentsByDate, findAppointmentByDateAndBarber, updateAppointment, deleteAppointment }