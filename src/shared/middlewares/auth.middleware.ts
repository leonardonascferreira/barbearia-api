import jwt from 'jsonwebtoken'

// middleware responsável por verificar se o token JWT é válido
async function authMiddleware(req, res, next) {
    // pega o token do cabeçalho Authorization
    const authHeader = req.headers.authorization
    if (authHeader) {
        // separa o "Bearer" do token
        const token = authHeader.split(' ')[1]
        // verifica se o token é válido
        jwt.verify(token, 'segredo', (err, decoded) => {
            if (err) {
                // token inválido ou expirado
                res.status(401).json({ message: 'Token inválido'})
            } else {
                // token válido, deixa a requisição passar
                next()
            }
        })
    } else {
        // token não foi enviado na requisição
        res.status(401).json({ message: 'Token não fornecido'})
    }
}

export { authMiddleware }