import { Router } from 'express'
import { createBarbeiro } from './barbeiros.controller.js'

const router = Router()

router.post ('/barbeiros', createBarbeiro)

export default router