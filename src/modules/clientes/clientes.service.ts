import { createCliente, findClienteByTelefone, updateCliente, findClienteById, deleteCliente} from "./clientes.repository.js"

async function createClienteService(nome: string, telefone: string, email: string) {
    if (!nome) throw new Error ('Nome não inserido')
    if (!telefone) throw new Error ('Telefone não inserido')

    const clienteExistente = await findClienteByTelefone(telefone)
    if (clienteExistente) throw new Error ('Telefone já cadastrado')

    const cliente = await createCliente(nome, telefone, email)
    return cliente
}

async function updateClienteService(id: number, nome: string, telefone: string, email: string) {
    const clienteAtual = await findClienteById(id)
    if (!clienteAtual) throw new Error ('Cliente não encontrado')

    const novoNome = nome || clienteAtual.nome
    const novoTelefone = telefone || clienteAtual.telefone
    const novoEmail = email || clienteAtual.email

    const cliente = await updateCliente(id, novoNome, novoTelefone, novoEmail)
    return cliente
}

async function deleteClienteService(id: number) {
    const cliente = await deleteCliente(id)
    return cliente
}

export { createClienteService }
export { updateClienteService }
export { deleteClienteService}