import app from './app.ts'
const port = 3000

app.listen(port, () => {
    console.log(`O servidor está rodando na ${port}`)
})