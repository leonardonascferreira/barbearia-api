import { createClienteService, updateClienteService, deleteClienteService } from "./clientes.service.js"

// função responsável por receber a requisição de criação e responder ao cliente
async function createCliente(req, res) {
    const { nome, telefone, email } = req.body
    try {
        const cliente = await createClienteService(nome, telefone, email)
        res.json(cliente)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// função responsável por receber a requisição de atualização e responder ao cliente
async function updateCliente(req, res) {
    const id = Number(req.params.id)
    const { nome, telefone, email } = req.body
    try {
        const cliente = await updateClienteService(id, nome, telefone, email)
        res.json(cliente)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// função responsável por receber a requisição de exclusão e responder ao cliente
async function deleteCliente(req, res) {
    const id = Number(req.params.id)
    try {
        const cliente = await deleteClienteService(id)
        res.json(cliente)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

export { createCliente }
export { updateCliente }
export { deleteCliente }