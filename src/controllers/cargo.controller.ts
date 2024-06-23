import { Request, Response } from "express";
import { number, z } from 'zod';
import repository from "../repository/repository";
import { isCargo } from "../models/cargo";

async function get(req: Request, res: Response) {
    const Query = req.newQuery
    const QuerySchema = z.union([
        z.object({
            id: z.bigint()
        }),
        z.object({
            pagina: z.number(),
            limite: z.number()
        })
    ])

    const safeParse = QuerySchema.safeParse(Query);

    if (!safeParse.success){
        return res.status(400).json(safeParse.error.errors)
    }


    if ('id' in safeParse.data){
        const result = await repository.cargo.getById(BigInt(safeParse.data.id))
        console.log(result)
        return res.status(200).json(result)
    }

    if ('pagina' in safeParse.data){
        return res.status(200).send(await repository.cargo.getAll({pagina: safeParse.data.pagina, limite: safeParse.data.limite}))
    }
    
}

async function create(req: Request, res: Response) {
    const novoCargo = req.body
    if (!isCargo(novoCargo)){
        res.status(400).send({
            error: 'Corpo de requisição deveria informar um cargo, com nome e permissões'
        })
    } else {
        const cargo = await repository.cargo.create(novoCargo)
        if (cargo) {
            cargo.permissoes = await repository.permissoesCargo.createMany(['Funcionario', ...novoCargo.permissoes], cargo.id)
        }
        
        return res.status(200).json(cargo)
    }
}

export default {get, create}