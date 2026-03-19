import { createBarbeiroService } from "./barbeiros.service.js";

async function createBarbeiro(req, res) {
    const {nome, login, senha} = req.body
    try {
        const barbeiro = await createBarbeiroService(nome, login, senha)
        res.json(barbeiro)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export { createBarbeiro }