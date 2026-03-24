import prisma from '../../config/prisma.js'

// função responsável por inserir um novo barbeiro no banco de dados
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

// função responsável por buscar um barbeiro no banco de dados pelo login
async function findBarbeiroByLogin(login: string) {
    const barbeiro = await prisma.barbeiro.findUnique({
        where: {
            login: login
        }
    })
    return barbeiro
}

// função responsável por buscar um barbeiro no banco de dados pelo id
async function findBarbeiroById(id: number) {
    const barbeiro = await prisma.barbeiro.findUnique({
        where: {
            id: id
        }
    })
    return barbeiro
}

export { createBarbeiro }
export { findBarbeiroByLogin }
export { findBarbeiroById }