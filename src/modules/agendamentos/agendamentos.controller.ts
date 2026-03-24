import { createAgendamentoService, updateAgendamentoService, deleteAgendamentoService, findAgendamentosByDataService } from "./agendamentos.service.js"

// função responsável por receber a requisição de criação e responder ao cliente
async function createAgendamento(req, res) {
    const { dataHora, clienteId, barbeiroId, servicoId } = req.body
    try {
        const agendamento = await createAgendamentoService(dataHora, clienteId, barbeiroId, servicoId)
        res.json(agendamento)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// função responsável por receber a requisição de atualização e responder ao cliente
async function updateAgendamento(req, res) {
    const id = Number(req.params.id)
    const { status } = req.body
    try {
        const agendamento = await updateAgendamentoService(id, status)
        res.json(agendamento)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// função responsável por receber a requisição de exclusão e responder ao cliente
async function deleteAgendamento(req, res) {
    const id = Number(req.params.id)
    try {
        const agendamento = await deleteAgendamentoService(id)
        res.json(agendamento)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function getAgendamentoByData(req, res) {
    const data = new Date(req.query.data as string)
    try {
        const agendamento = await findAgendamentosByDataService(data)
        res.json(agendamento)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export { createAgendamento }
export { updateAgendamento }
export { deleteAgendamento }
export { getAgendamentoByData }