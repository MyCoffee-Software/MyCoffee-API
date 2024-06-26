import { Request, Response, request } from "express";
import { number, z } from 'zod';
import repository from "../repository/repository";
import { CargoSchema, isCargo } from "../models/cargo";

async function get(req: Request, res: Response) {
    const Query = req.newQuery
    const QuerySchema = z.union([
        z.object({
            id: z.number()
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
        const result = await repository.cargo.getById(safeParse.data.id)
        if (result) {
            result.permissoes = await repository.permissoesCargo.getByCargo(result)
        }
        return res.status(200).json(result)
    }

    if ('pagina' in safeParse.data){
        return res.status(200).send(await repository.cargo.getAll({pagina: safeParse.data.pagina, limite: safeParse.data.limite}))
    }
    
}

async function create(req: Request, res: Response) {
    const novoCargo = req.body

    const safeParse = CargoSchema.safeParse(req.body)

    const resultado = await repository.cargo.create(safeParse.data)
    if (resultado) {
        resultado.permissoes = await repository.permissoesCargo.createMany(novoCargo.permissoes, resultado.id)
    }
    
    return res.status(200).json(resultado)

}

async function update(req: Request, res: Response) {
    const Query = req.newQuery
    const Body = req.body

    const resultado = await repository.cargo.update(Body, Query.id)
    if (resultado != undefined){
        resultado.permissoes = await repository.permissoesCargo.updateByCargo(resultado, Body.permissoes)
    }

    res.status(200).json(resultado)
}

async function Delete(req: Request, res: Response) {
    const Query = req.newQuery
    const resultado = await repository.cargo.Delete(Query.id)
    if (resultado != undefined){
        res.status(200).json(resultado)    
    }    
}


export default {get, create, update, Delete}