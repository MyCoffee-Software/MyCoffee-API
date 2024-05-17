import { NextFunction, Request, Response } from "express"
import { Permissao } from "../models/permissao"
import jwt from "jsonwebtoken"
import prisma from "../db"

export function authorizationMiddleware(...permissoes: Array<Permissao>){
    return async (req: Request, res: Response, next: NextFunction) => {
        const JWT_SECRET = process.env.JWT_SECRET
        if (permissoes.length === 0){
            console.log('Nenhuma permissão exigida')
            return next()
        }

        if (!req.user){
            return res.status(401).json({ msg: "Usuário não autenticado. Autorização negada"})
        }

        //let PermissoesNaoConcedidas: Permissao[] = []

        permissoes.forEach(async (permissao: Permissao) => {
            if (permissao == "Administrador") {
                const admin = await prisma.admin.findUnique({where: {idAdmin: req.user?.id}})
                if(admin) {
                    return next()
                } else {
                    return res.status(401).json({msg: "Usuário não autorizado."})
                }
            }

            else {
                //Implementação das outras permissões
                return res.status(401).json({msg: "Usuário não autorizado."})
            }            
        })
    }
}