import prisma from '../../config/prisma.js'

// função responsável por criar um novo agendamento
async function createAgendamento(dataHora: Date, status: string, clienteId: number, barbeiroId: number, servicoId: number) {
    const agendamento = await prisma.agendamento.create({
        data: {
            dataHora: dataHora,
            status: status,
            clienteId: clienteId,
            barbeiroId: barbeiroId,
            servicoId: servicoId
        }
    })
    return agendamento
}

// função responsável por buscar todos os serviços pela data
async function findAgendamentosByData(dataHora: Date) {
    const agendamento = await prisma.agendamento.findMany({
        where: {
            dataHora: dataHora
        }
    })
    return agendamento
}

// função responsável por atualizar o campo que desejar
async function updateAgendamento(id: number, status: string) {
    const agendamento = await prisma.agendamento.update({
        where: {
            id: id
        }, 
        data: {
            status: status,
        }
    })
    return agendamento
}

// função responsável por deletar o agendamento
async function deleteAgendamento(id: number) {
    const agendamento = await prisma.agendamento.delete({
        where: {
            id: id
        }
    })
    return agendamento
}

// função responsável por verificar se já existe um agendamento para o mesmo barbeiro no mesmo horário
async function findAgendamentosByDataHoraEBarbeiro(dataHora: Date, barbeiroId: number) {
    const agendamento = await prisma.agendamento.findFirst({
        where: {
            dataHora: dataHora,
            barbeiroId: barbeiroId
        }
    })
    return agendamento
}


export { createAgendamento }
export { findAgendamentosByData }
export { updateAgendamento }
export { deleteAgendamento }
export { findAgendamentosByDataHoraEBarbeiro }