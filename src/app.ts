import express from 'express'
import cors from 'cors'
import barberRouter from './modules/barbers/barbers.routes.js'
import serviceRouter from './modules/services/services.routes.js'
import appointmentRouter from './modules/appointments/appointments.routes.js'
import clientRouter from './modules/clients/clients.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(barberRouter)
app.use(serviceRouter)
app.use(appointmentRouter)
app.use(clientRouter)

app.get('/', (req, res) => {
  res.send('API is running')
})

export default app