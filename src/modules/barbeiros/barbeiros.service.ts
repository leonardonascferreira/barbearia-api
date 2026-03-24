import { createBarbeiro, findBarbeiroByLogin } from '../barbeiros/barbeiros.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// função com as regras de negócio para criar um barbeiro
async function createBarbeiroService(nome: string, login: string, senha: string) {
    // verifica se já existe um barbeiro com esse login
    const barbeiro = await findBarbeiroByLogin(login)
    if (barbeiro) {
        throw new Error('Login já cadastrado')
    } else {
        // criptografa a senha no banco de dados (antes de salvar)
        const senhaHash = await bcrypt.hash(senha, 10)
        // cria o barbeiro com a senha criptografada
        const novoBarbeiro = await createBarbeiro(nome, login, senhaHash)
        return novoBarbeiro
    }
}   

// função com as regras de negócio para autenticar um barbeiro
async function loginBarbeiroService(login: string, senha: string) {
    // busca o barbeiro pelo login
    const barbeiro = await findBarbeiroByLogin(login)
    if (barbeiro) {
        // compara a senha digitada com o hash salvo no banco de dados
        const corresponde = await bcrypt.compare(senha, barbeiro.senha)
        if (!corresponde) {
            throw new Error('Senha inválida')
        } else {
            // gera um token JWT com o id do barbeiro e retorna
            const token = jwt.sign({ id: barbeiro.id }, process.env.JWT_SECRET!, {expiresIn: '1d'}) 
            return token
        }
    } else {
        throw new Error('Login não encontrado')
    }
}


export { createBarbeiroService }
export { loginBarbeiroService }