import prisma from '../../config/prisma.js'

// função responsável por criar um novo serviço
async function createServico(nome: string, preco: number, duracao: number) {
    const servico = await prisma.servico.create({
        data: {
            nome: nome,
            preco: preco,
            duracao: duracao
        }
    })
    return servico
}

// função responsável por buscar todos os serviços
async function findAllServicos() {
    const servico = await prisma.servico.findMany()
    return servico
}

// função responsável por atualizar o campo que desejar
async function updateServico(id: number, nome: string, preco: number, duracao: number) {
    const servico = await prisma.servico.update({
        where: {
            id: id
        },
        data: {
            nome: nome,
            preco: preco,
            duracao: duracao
        }
    })
    return servico
}

// função para deletar o serviço
async function deleteServico(id: number) {
    const servico = await prisma.servico.delete({
        where: {
            id: id
        }
    })
    return servico
}

async function findServicoById(id: number) {
    const servico = await prisma.servico.findUnique({
        where: {
            id: id
        }
    })
    return servico
}

export { createServico }
export { findAllServicos }
export { updateServico }
export { deleteServico }
export { findServicoById }