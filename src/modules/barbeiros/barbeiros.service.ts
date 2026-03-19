import { createBarbeiro } from '../barbeiros/barbeiros.repository.js'
import { findBarbeiroByLogin } from '../barbeiros/barbeiros.repository.js'

// Função para verificar se já possui login
async function createBarbeiroService(nome: string, login: string, senha: string) {
    const barbeiro = await findBarbeiroByLogin(login)
    if (barbeiro) {
        throw new Error('Login já cadastrado')
    } else {
        const novoBarbeiro = await createBarbeiro(nome, login, senha)
        return novoBarbeiro
    }
}   

export { createBarbeiroService }