import { Router } from "express"
import { createCliente, updateCliente, deleteCliente } from "./clientes.controller.js"

const router = Router()

router.post('/clientes', createCliente)
router.put('/clientes/:id', updateCliente)
router.delete('/clientes/:id', deleteCliente)

export default router