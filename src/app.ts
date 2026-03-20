import express from 'express'   
import barbeiroRouter from './modules/barbeiros/barbeiros.routes.js'
import servicoRouter from './modules/servicos/servicos.routes.js'

// cria a instância da aplicação
const app = express()

// permite que a aplicação leia JSON no corpo das requisições
app.use(express.json())

// registra as rotas do barbeiros na aplicação
app.use(barbeiroRouter)

// registra as rotas dos serviços na aplicação
app.use(servicoRouter)

// exporta o app para ser usado no server.ts
export default app