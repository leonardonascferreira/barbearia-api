import { Router } from 'express'
const router = Router()

router.get ('/barbeiros', async (req, res) => {
    res.json({ message: "rota funcionando" })
})

export default router