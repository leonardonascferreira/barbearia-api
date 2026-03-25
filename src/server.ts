import 'dotenv/config'
import app from './app.js'

// define a porta que o servidor vai escutar
const port = 3000

// inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`O servidor está rodando na ${port}`)
})