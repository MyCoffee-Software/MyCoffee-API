import { Request, Response } from "express";
import { Assinatura } from "../models/assinatura";
import repository from "../repository/repository";
import { Usuario } from "../models/usuario";
import { Periodo } from "../models/periodo";
import { DateSchema } from "../utils/dateSchema";

async function getSelf(req: Request, res: Response){
    const User = req.user as Usuario

    const result = await repository.assinatura.getVigente(User.id)

    res.status(200).json(result)
}

async function get(req: Request, res: Response){
    const Query = req.newQuery

    if ('id' in Query) {
        const result = await repository.assinatura.getVigente(Query.id)
        res.status(200).json(result)
    }

    if ('pagina' in Query && 'limite' in Query) {
        const result = await repository.assinatura.getAll({pagina: Query.pagina, limite: Query.limite})
        res.status(200).json(result)
    }
}

async function create(req: Request, res: Response){
    const User = req.user as Usuario
    const Body = req.body as Assinatura
    Body.dataInicio = DateSchema.parse(Body.dataInicio)
    Body.dataFim = DateSchema.parse(Body.dataFim)
    try {
        const result = await repository.assinatura.create(Body, User.id)    
        if(result != undefined){
            res.status(200).json(result)
        }

    } catch (error) {
        res.status(400).json({error: error})
    }
    

}

async function estender(req: Request, res: Response){
    const User = req.user as Usuario
    const Body = req.body as Periodo

    const result = await repository.assinatura.estender(Body, User.id)

    if(result != undefined){
        res.status(200).json(result)
    }
}

async function cancelar(req: Request, res: Response){
    const User = req.user as Usuario

    const result = await repository.assinatura.cancelar(User.id)

    if (result != undefined) {
        res.status(200).json(result)
    }
}

async function update(req: Request, res: Response){
    const Body = req.body as Assinatura
    
    Body.dataInicio = DateSchema.parse(Body.dataInicio)
    Body.dataFim = DateSchema.parse(Body.dataFim)

    const result = await repository.assinatura.update(Body)

    if (result != undefined) {
        res.status(200).json(result)
    }
}

export default {create, estender, cancelar, update, getSelf, get}
