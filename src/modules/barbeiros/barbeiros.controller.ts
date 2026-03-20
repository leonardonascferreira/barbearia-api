import { createBarbeiroService, loginBarbeiroService } from "./barbeiros.service.js";

// função responsável por receber a requisição e responder ao cliente
async function createBarbeiro(req, res) {
    // extrai os dados do corpo da requisição
    const {nome, login, senha} = req.body
    try {
        // chama o service para criar o barbeiro
        const barbeiro = await createBarbeiroService(nome, login, senha)
        // responde com o barbeiro criado
        res.json(barbeiro)
    } catch (error) {
        // se der erro, responde com status 400 e a mensagem de erro
        res.status(400).json({ message: error.message })
    }
}

// função responsável por receber a requisição de login e retornar o token JWT
async function loginBarbeiro(req, res) {
    // extrai login e senha do corpo de requisição
    const {login, senha} = req.body
    try {
        // chama o service para autenticar o barbeiro e gerar o token
        const token = await loginBarbeiroService(login, senha)
        // responde com o token gerado
        res.json({ token })
    } catch (error) {
        // se der erro, responde com status 400 e a mensagem de erro
        res.status(400).json({ message: error.message })
    }
}

export { createBarbeiro }
export { loginBarbeiro }