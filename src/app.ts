import express from 'express'   
import cors from 'cors'
import barbeiroRouter from './modules/barbeiros/barbeiros.routes.js'
import servicoRouter from './modules/servicos/servicos.routes.js'
import agendamentoRouter from './modules/agendamentos/agendamentos.routes.js'
import clienteRouter from './modules/clientes/clientes.routes.js'

// cria a instância da aplicação
const app = express()

// permite que a aplicação leia JSON no corpo das requisições
app.use(express.json())

// permite que o frontend consuma a API
app.use(cors())

// registra as rotas do barbeiros na aplicação
app.use(barbeiroRouter)

// registra as rotas dos serviços na aplicação
app.use(servicoRouter)

// registra as rotas dos agendamentos na aplicação
app.use(agendamentoRouter)

// registra as rotas dos clientes na aplicação
app.use(clienteRouter)

app.get("/", (req, res) => {
    res.send("API rodando")
})

// exporta o app para ser usado no server.ts
export default app