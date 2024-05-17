import { NextFunction, Request, Response } from "express"
import { Permissao } from "../models/permissao"
import jwt from "jsonwebtoken"


export function authorizationMiddleware(...permissoes: Array<Permissao>){
    return (req: Request, res: Response, next: NextFunction) => {
        if (permissoes.length === 0){
            console.log('Nenhuma permissão exigida')
            return next()
        }

        console.log(req.user)


        console.log(permissoes)
        const token = req.header('x-auth-token')
    
        if (!token) {
            return res.status(401).json({ msg: 'Não há token, autorização negada'})
        }
    
        try {
            const tokenDecodificado = jwt.verify(token, 'chave123')
            console.log(tokenDecodificado)
            next()
        } catch (err) {
            res.status(401).json({msg: 'Token inválido'})
        }
    }
}