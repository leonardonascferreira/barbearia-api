import { createServicoService, deleteServicoService, findAllServicoService, updateServicoService } from "./servicos.service.js"

// função responsável por receber a requisição de criação e responder ao cliente
async function createServico(req, res) {
    const { nome, preco, duracao } = req.body
    try {
        const servico = await createServicoService(nome, preco, duracao)
        res.json(servico)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// função responsável por listar todos os serviços
async function findAllServicos(req, res) {
    try {
        const servicos = await findAllServicoService()
        res.json(servicos)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// função responsável por receber a requisição de atualização e responder ao cliente
async function updateServico(req, res) {
    const id = Number(req.params.id)
    const {nome, preco, duracao} = req.body
    try {
        const servico = await updateServicoService(id, nome, preco, duracao)
        res.json(servico)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// função responsável por receber a requisição de exclusão e responder ao cliente
async function deleteServico(req, res) {
    const id = Number(req.params.id)
    try {
        const servico = await deleteServicoService(id)
        res.json(servico)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export { createServico }
export { findAllServicos }
export { updateServico }
export { deleteServico }