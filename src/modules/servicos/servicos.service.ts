import { createServico, deleteServico, findAllServicos, updateServico, findServicoById} from "./servicos.repository.js"

// função para criar um serviço, com tratamento de erro
async function createServicoService(nome: string, preco: number, duracao: number) {
    if (!nome) throw new Error ('Nehum nome definido') 
    if (!preco || preco <= 0) throw new Error ('Nehum preço definido')
    if (!duracao || duracao <= 0) throw new Error ('Nenhuma duração definida')

    const servico = await createServico(nome, preco, duracao)
    return servico
}

// função para buscar todos os serviços sem filtros
async function findAllServicoService(){
    const servico = await findAllServicos()
    return servico
}

// função para atualizar um serviço, com tratamento de erro
async function updateServicoService(id: number, nome: string, preco: number, duracao: number) {
    const servicoAtual = await findServicoById(id)
    if (!servicoAtual) throw new Error('Serviço não encontrado')
    
    const novoNome = nome || servicoAtual.nome
    const novoPreco = preco || servicoAtual.preco
    const novaDuracao = duracao || servicoAtual.duracao

    const servico = await updateServico(id, novoNome, novoPreco, novaDuracao)
    return servico
}

// função para deletar um serviço pelo id
async function deleteServicoService(id: number) {
    const servico = await deleteServico(id)
    return servico
}

export { createServicoService }
export { findAllServicoService }
export { updateServicoService }
export { deleteServicoService }