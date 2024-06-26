import { NextFunction, Request, Response } from "express";
import { usuarioSchema } from "../models/usuario";

async function personalDataMutationAuth(req: Request, res: Response, next: NextFunction){
    const idUsuario = req.newQuery.id 

    if (req.user != undefined){
        if (req.user.id == idUsuario){
            return next()
        }
    }

    return res.status(401).json({error: "Acesso negado."})
}