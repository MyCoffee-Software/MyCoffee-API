import { Request, Response } from "express";
import { Assinatura } from "../models/assinatura";
import repository from "../repository/repository";
import { Usuario } from "../models/usuario";

async function create(req: Request, res: Response){
    const User = req.user as Usuario
    const Body = req.body as Assinatura

    const result = await repository.assinatura.create(Body, User.id)

    if(result != undefined){
        res.status(200).json(result)
    }
}

export default {create}
