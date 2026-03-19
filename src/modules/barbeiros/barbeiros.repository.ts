import prisma from '../../config/prisma.js'

// Função para criar a conta do barbeiro
async function createBarbeiro(nome: string, login: string, senha: string) {
    const barbeiro = await prisma.barbeiro.create({
        data: {
            nome: nome,
            login: login,
            senha: senha
        }
    })
    return barbeiro
}

// Função para achar o barbeiro pelo login
async function findBarbeiroByLogin(login: string) {
    const barbeiro = await prisma.barbeiro.findUnique({
        where: {
            login: login
        }
    })
    return barbeiro
}

export { createBarbeiro }
export { findBarbeiroByLogin }