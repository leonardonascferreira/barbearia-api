import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

/** Formato do payload gravado no token durante o login. */
interface JwtPayload {
    id: number
}

/** Estende o tipo Request do Express para incluir `user`,
 * disponível após a validação do token.
 */
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload
}

export async function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    // Header obrigatório no formato "Bearer <token> "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            // Token inválido, adulterado ou expirado
            return res.status(401).json({ message: 'Token inválido' })
        }

        // Injeta os dados do barbeiro autenticado na requisição
        req.user = decoded as JwtPayload
        next()
    })
}
