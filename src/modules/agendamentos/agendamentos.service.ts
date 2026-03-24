import { findBarbeiroById } from "../barbeiros/barbeiros.repository.js"
import { findServicoById } from "../servicos/servicos.repository.js"
import { createAgendamento, updateAgendamento, deleteAgendamento, findAgendamentosByDataHoraEBarbeiro, findAgendamentosByData } from "./agendamentos.repository.js"

// função para criar um agendamento com tratamento de erro
async function createAgendamentoService(dataHora: Date, clienteId: number, barbeiroId: number, servicoId: number) {
    if (dataHora < new Date()) throw new Error ('Data não pode ser no passado')
    const agendamento = await findAgendamentosByDataHoraEBarbeiro(dataHora, barbeiroId)
    if (agendamento) throw new Error ('Horário já ocupado')
    const barbeiro = await findBarbeiroById(barbeiroId)
    if (!barbeiro) throw new Error ('Barbeiro não encontrado')
    const servico = await findServicoById(servicoId)
    if (!servico) throw new Error ('Serviço não encontrado')
        
    const novoAgendamento = await createAgendamento(dataHora, 'pendente', clienteId, barbeiroId, servicoId)
    return novoAgendamento
}

// função para atualizar um agendamento
async function updateAgendamentoService(id: number, status: string) {
    const agendamento = await updateAgendamento(id, status)
    return agendamento
}

// função para deletar um agendamento pelo id
async function deleteAgendamentoService(id: number) {
    const agendamento = await deleteAgendamento(id)
    return agendamento
}

async function findAgendamentosByDataService(data: Date) {
    const agendamento = await findAgendamentosByData(data)
    return agendamento
}

export { createAgendamentoService }
export { updateAgendamentoService }
export { deleteAgendamentoService }
export { findAgendamentosByDataService }