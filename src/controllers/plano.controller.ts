import { Request, Response } from "express";
import repository from "../repository/repository";
import { z } from 'zod';
import { PlanoSchema } from "../models/plano";

async function get(req: Request, res: Response) {
    const query = req.newQuery
    const querySchema = z.union([
        z.object({
            id: z.number()
        }),
        z.object({
            pagina: z.number(),
            limite: z.number(),
        })
    ])

    const safeParse = querySchema.safeParse(query);

    if (!safeParse.success) {
        return res.status(400).json(safeParse.error.errors);
    }

    if ('id' in safeParse.data) {
        const result = await repository.plano.getById(safeParse.data.id);
        return res.status(200).json(result);
    }

    if ('pagina' in safeParse.data) {
        return res.status(200).send(await repository.plano.getAll({
            pagina: safeParse.data.pagina,
            limite: safeParse.data.limite,
        }));
    }
}

async function create(req: Request, res: Response) {
    const safeParse = PlanoSchema.safeParse(req.body);

    if (!safeParse.success) {
        res.status(400).json(safeParse.error.errors);
    } else {
        const result = await repository.plano.create(safeParse.data);
        return res.status(200).json(result);
    }
}

async function update(req: Request, res: Response) {
    const query = req.newQuery
    const safeParse = PlanoSchema.safeParse(req.body);

    if (!safeParse.success) {
        res.status(400).json(safeParse.error.errors);
    } else {
        const result = await repository.plano.update(safeParse.data, query.id);
        res.status(200).json(result);
    }
}

async function Delete(req: Request, res: Response) {
    const Query = req.newQuery
    const resultado = await repository.plano.Delete(Query.id)
    
    if (resultado != undefined){
        res.status(200).json(resultado)    
    }    
}


export default {get, create, update, Delete}