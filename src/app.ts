import express from 'express'   
import router from './modules/barbeiros/barbeiros.routes.js'

// cria a instância da aplicação
const app = express()

// permite que a aplicação leia JSON no corpo das requisições
app.use(express.json())

// registra as rotas do barbeiros na aplicação
app.use(router)

// exporta o app para ser usado no server.ts
export default app