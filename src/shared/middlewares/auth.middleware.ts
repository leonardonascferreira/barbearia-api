import jwt from 'jsonwebtoken'

// middleware responsável por verificar se o token JWT é válido
async function authMiddleware(req, res, next) {
    // pega o token do cabeçalho Authorization
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    // separa o "Bearer" do token
    const token = authHeader.split(' ')[1]

    // verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // token inválido ou expirado
            return res.status(401).json({ message: 'Token inválido'})
        }
        // token válido, deixa a requisição passar
        next()
    })
} 

export { authMiddleware }