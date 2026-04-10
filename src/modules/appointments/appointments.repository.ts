import prisma from '../../config/prisma.js'
import { AppointmentStatus } from '@prisma/client'

/** Cria um novo agendamento com status inicial PENDING. */
async function createAppointment(
  scheduledAt: Date,
  clientId: number,
  barberId: number,
  serviceId: number
) {
  return prisma.appointment.create({
    data: { scheduledAt, status: 'PENDING', clientId, barberId, serviceId }
  })
}

/**
 * Retorna todos os agendamentos de um dia específico,
 * ordenando por horário crescente, com dados relacionados incluídos.
 * 
 * A senha do barbeiro é excluida da resposta por segurança.  
 */
async function findAppointmentsByDate(date: Date) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  return prisma.appointment.findMany({
    where: { scheduledAt: { gte: start, lte: end } },
    orderBy: { scheduledAt: 'asc' },
    include: {
      client: true,
      barber: {
        select: { id: true, name: true, email: true }
      },
      service: true
    }
  })
}


/**
 * Detecta colisão de horário levando em conta a duração do serviço.
 * 
 * Um conflito ocorre quando um agendamento existente (não cancelado) do
 * mesmo barbeiro possui um intervalo [scheduledAt, scheduledAt + duration]
 * que se sobrepõe ao intervalo do novo agendamento.
 */
async function findOverlappingAppointment(
  barberId: number,
  newStart: Date,
  newEnd: Date,
  excludeId?: number,
) {
  return prisma.appointment.findFirst({
    where: { 
      barberId, 
      // Ignora agendamentos cancelados - horário liberado
      status: { not: 'CANCELED' },
      // Excluí o próprio agendamento ao editar
      ...(excludeId ? { id: { not: excludeId } } : {}),
      // Detecta sobreposição de intervalos:
      // O agendamento existente começa antes do fim do novo
      // E o agendamento existente termina depois do início do novo
      scheduledAt: { lt: newEnd },
      // "termina depois" exite join com service para calcular o fim
      // como o Prisma não suporta aritmética de coluna nativa,
      // usamos uma rawQuery apenas para a parte de "fim do existente".
      // a consulta abaixo resolve na camada de aplicação com dois passos:
      // este findFirst retorna candidatos que começam antes de newEnd,
      // e o service filtra os que terminam depois de newStart.
     },
     include: { service: true }
  })
}

/**
 * Atualiza o status de um agendamento.
 * A validação de transição de status é feita na camada de serviço.
 */
async function updateAppointmentStatus(id: number, status: AppointmentStatus) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  })
}

/**
 * Remove um agendamento pelo ID.
 * Lança erro do prisma se não encontrado.
 */
async function deleteAppointment(id: number) {
  return prisma.appointment.delete({ where: { id } })
}

/** Busca agendamento pelo ID, incluindo o serviço (necessário para calcular a duração). */
async function findAppointmentById(id: number) {
  return prisma.appointment.findUnique({
    where: { id },
    include: { service: true }
  })
}

/**
 * Retorna todos os agendamentos confirmados ou pendentes de um barbeiro
 * dentro de um intervalo de tempo, para verificação de disponibilidade.
 */
async function findActiveAppointmentsByBarberAndRange(
  barberId: number,
  start: Date,
  end: Date
) {
  return prisma.appointment.findMany({
    where: {
      barberId,
      status: { not: 'CANCELED' },
      scheduledAt: { gte: start, lt: end }
    },
    include: { service: true },
    orderBy: { scheduledAt: 'asc' }
  })
}

export {
  createAppointment,
  findAppointmentsByDate,
  findOverlappingAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  findAppointmentById,
  findActiveAppointmentsByBarberAndRange
}
