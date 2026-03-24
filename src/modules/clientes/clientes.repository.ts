import prisma from '../../config/prisma.js'

async function createCliente(nome: string, telefone: string, email: string) {
    const cliente = await prisma.cliente.create({
        data: {
            nome: nome,
            telefone: telefone,
            email: email
        }
    })
    return cliente
}

async function findClienteByTelefone(telefone: string) {
    const cliente = await prisma.cliente.findUnique({
        where: {
            telefone: telefone
        }
    })
    return cliente
}

async function findClienteById(id: number) {
    const cliente = await prisma.cliente.findUnique({
        where: {
            id: id
        }
    })
    return cliente
}

async function updateCliente(id: number, nome: string, telefone: string, email: string) {
    const cliente = await prisma.cliente.update({
        where: {
            id: id
        }, data: {
            nome: nome,
            telefone: telefone,
            email: email
        }
    })
    return cliente
}

async function deleteCliente(id: number) {
    const cliente = await prisma.cliente.delete({
        where: {
            id: id
        }
    })
    return cliente
}

export { createCliente }
export { findClienteByTelefone }
export { findClienteById }
export { updateCliente }
export { deleteCliente }