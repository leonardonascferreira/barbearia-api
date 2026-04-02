import { Router } from 'express'
import { createBarber, loginBarber } from './barbers.controller.js'

const router = Router()

router.post('/barbers', createBarber)
router.post('/login', loginBarber)

export default router