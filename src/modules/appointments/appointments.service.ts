import { AppointmentStatus } from '@prisma/client'
import { findBarberById } from '../barbers/barbers.repository.js'
import { findClientByPhone, createClient } from '../clients/clients.repository.js'
import { findServiceById } from '../services/services.repository.js'
import {
  createAppointment,
  findOverlappingAppointment,
  findAppointmentsByDate,
  findAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  findActiveAppointmentsByBarberAndRange
} from './appointments.repository.js'

const VALID_TRANSITIONS: Record<string, AppointmentStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELED'],
  CONFIRMED: ['COMPLETED', 'CANCELED'],
  COMPLETED: [],
  CANCELED: []
}

// Horário de funcionamento da barbearia (em horas)
const OPENING_HOUR = 8   // 08:00
const CLOSING_HOUR = 18  // 18:00

/**
 * Cria um novo agendamento.
 *
 * O cliente pode ser identificado apenas pelo telefone:
 *  - Se já existir, o agendamento é vinculado ao cadastro existente.
 *  - Se não existir, um novo cliente é criado automaticamente com os dados fornecidos.
 */
async function createAppointmentService(
  scheduledAt: Date,
  barberId: number,
  serviceId: number,
  clientPhone: string,
  clientName?: string,
  clientEmail?: string
) {
  // 1. Validação de data
  if (scheduledAt <= new Date()) {
    throw new Error('O horário deve ser no futuro')
  }

  // 2. Barbeiro e serviço devem existir
  const barber = await findBarberById(barberId)
  if (!barber) throw new Error('Barbeiro não encontrado')

  const service = await findServiceById(serviceId)
  if (!service) throw new Error('Serviço não encontrado')

  // 3. Calcular o fim do novo agendamento com base na duração do serviço
  const newEnd = new Date(scheduledAt.getTime() + service.duration * 60_000)

  // 4. Validação de horário de funcionamento
  const startHour = scheduledAt.getHours()
  const endHour = newEnd.getHours() + (newEnd.getMinutes() > 0 ? 1 : 0)

  if (startHour < OPENING_HOUR || endHour > CLOSING_HOUR) {
    throw new Error(
      `Agendamentos permitidos entre ${OPENING_HOUR}h e ${CLOSING_HOUR}h`
    )
  }

  // 5. Verificar colisão de horário
  const candidates = await findActiveAppointmentsByBarberAndRange(barberId, scheduledAt, newEnd)
  for (const candidate of candidates) {
    const candidateEnd = new Date(
      candidate.scheduledAt.getTime() + candidate.service.duration * 60_000
    )

    if (scheduledAt < candidateEnd && newEnd > candidate.scheduledAt) {
      throw new Error('Horário já ocupado para este barbeiro')
    }
  }

  // 6. Resolver cliente: reutiliza o existente ou cria um novo pelo telefone
  if (!clientPhone) throw new Error('Telefone do cliente é obrigatório')

  let client = await findClientByPhone(clientPhone)
  if (!client) {
    if (!clientName) throw new Error('Nome do cliente é obrigatório no primeiro agendamento')
    client = await createClient(clientName, clientPhone, clientEmail)
  }

  return createAppointment(scheduledAt, client.id, barberId, serviceId)
}
/**
 * Atualiza o status de um agendamento.
 */
async function updateAppointmentService(id: number, newStatus: string) {
  const appointment = await findAppointmentById(id)
  if (!appointment) throw new Error('Agendamento não encontrado')

  const currentStatus = appointment.status as string
  const allowed = VALID_TRANSITIONS[currentStatus] ?? []

  if (!allowed.includes(newStatus as AppointmentStatus)) {
    throw new Error(
      `Transição inválida: ${currentStatus} → ${newStatus}. ` +
      `Permitidas: ${allowed.join(', ') || 'nenhuma'}`
    )
  }

  return updateAppointmentStatus(id, newStatus as AppointmentStatus)
}

/**
 * Remove um agendamento pelo ID.
 * Verifica existência antes para retornar mensagem clara.
 */
async function deleteAppointmentService(id: number) {
  const appointment = await findAppointmentById(id)
  if (!appointment) throw new Error('Agendamento não encontrado')

  return deleteAppointment(id)
}

/** Retorna todos os agendamentos de um dia, ordenados por horário. */
async function findAppointmentsByDateService(date: Date) {
  return findAppointmentsByDate(date)
}

/**
 * Calcula os horários disponíveis para um barbeiro em um dia específico,
 * considerando a duração do serviço escolhido.
 *
 * Gera slots de hora em hora dentro do horário de funcionamento
 * e descarta os que conflitam com agendamentos existentes (não cancelados).
 */
async function getAvailabilityService(date: Date, barberId: number, serviceId: number) {
  const barber = await findBarberById(barberId)
  if (!barber) throw new Error('Barbeiro não encontrado')

  const service = await findServiceById(serviceId)
  if (!service) throw new Error('Serviço não encontrado')

  const durationMs = service.duration * 60_000

  // Define os limites do dia dentro do horário de funcionamento
  const dayStart = new Date(date)
  dayStart.setHours(OPENING_HOUR, 0, 0, 0)

  const dayEnd = new Date(date)
  dayEnd.setHours(CLOSING_HOUR, 0, 0, 0)

  // Busca todos os agendamentos ativos do barbeiro no dia
  const existing = await findActiveAppointmentsByBarberAndRange(barberId, dayStart, dayEnd)

  // Gera slots de 30 em 30 minutos e verifica disponibilidade de cada um
  const slots: { time: Date }[] = []
  const slotIntervalMs = 30 * 60_000
  let cursor = dayStart.getTime()

  while (cursor + durationMs <= dayEnd.getTime()) {
    const slotStart = new Date(cursor)
    const slotEnd = new Date(cursor + durationMs)

    // Verifica se o slot conflita com algum agendamento existente
    const hasConflict = existing.some((appt) => {
      const apptEnd = new Date(appt.scheduledAt.getTime() + appt.service.duration * 60_000)
      // Sobreposição: slot começa antes do fim do appt E termina depois do início do appt
      return slotStart < apptEnd && slotEnd > appt.scheduledAt
    })

    if (!hasConflict) {
      slots.push({ time: slotStart })
    }

    cursor += slotIntervalMs
  }

  return slots
}

export {
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  findAppointmentsByDateService,
  getAvailabilityService
}