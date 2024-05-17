import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { Usuario } from "../models/usuario"

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization

    console.log('aqui', authorizationHeader)
    
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        console.log(token)
        jwt.verify(token, 'chave123', (err, user) => {
            if (err) return res.status(403).json({
                error: 'Token inválido'
            })

            req.user = user as Usuario
        })
    } else {
        req.user = undefined
    }

    console.log(req.user)
    next()
}