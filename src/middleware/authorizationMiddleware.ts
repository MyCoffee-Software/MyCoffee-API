import { NextFunction, Request, Response } from "express"
import { Permissao } from "../models/permissao"
import jwt from "jsonwebtoken"
import AuthController from '../controllers/auth.controller'

function authorizationMiddleware(...permissoesRequeridas: Array<Permissao>){
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('Autorizando...')
        const permissoesDadas = await AuthController.getPermissoes(req.user)
        console.log('PERMISSÕES - ', permissoesDadas)

        if (permissoesDadas != undefined){
        
            if (permissoesDadas.includes('Administrador')){
                return next()
            }
    
            if (permissoesRequeridas.every((permissao) => permissoesDadas.includes(permissao))){
                return next()
            }
        }

        res.status(401).send({
            message: "Acesso negado."
        })
    }
}

export default authorizationMiddleware