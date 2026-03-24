import { createBarbeiroService, loginBarbeiroService } from "./barbeiros.service.js"

// função responsável por receber a requisição e responder ao cliente
async function createBarbeiro(req, res) {
    const { nome, login, senha } = req.body
    try {
        const barbeiro = await createBarbeiroService(nome, login, senha)
        res.json(barbeiro)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// função responsável por receber a requisição de login e retornar o token JWT
async function loginBarbeiro(req, res) {
    const { login, senha } = req.body
    try {
        const token = await loginBarbeiroService(login, senha)
        res.json({ token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export { createBarbeiro }
export { loginBarbeiro }