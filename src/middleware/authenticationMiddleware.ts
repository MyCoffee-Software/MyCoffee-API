import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Usuario } from "../models/usuario"

async function authenticationMiddleware(req: Request, res: Response, next: NextFunction){
    const JWT_SECRET = process.env.JWT_SECRET
    const authorizationHeader = req.headers.authorization
    
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, JWT_SECRET as string, (err, token) => {
            if (err) {
                console.error(err)
                res.status(403).json({error: "Token inválido"})
            }
           
            else {
                
                const user = (token as JwtPayload).user
                req.user = user as Usuario
                return next()
            }
        })
    } else {
        req.user = undefined
        return next()
    }
}

export default authenticationMiddleware