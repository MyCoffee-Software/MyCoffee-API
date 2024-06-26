import { Request, Response } from "express";
import repository from "../repository/repository";
import { z } from 'zod';
import { CategoriaSchema } from "../models/categoria";

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
        const result = await repository.categoria.getById(safeParse.data.id);
        return res.status(200).json(result);
    }

    if ('pagina' in safeParse.data) {
        return res.status(200).send(await repository.categoria.getAll({
            pagina: safeParse.data.pagina,
            limite: safeParse.data.limite,
        }));
    }
}

async function create(req: Request, res: Response) {
    const safeParse = CategoriaSchema.safeParse(req.body);

    if (!safeParse.success) {
        res.status(400).json(safeParse.error.errors);
    } else {
        const result = await repository.categoria.create(safeParse.data);
        return res.status(200).json(result);
    }
}

async function update(req: Request, res: Response) {
    const query = req.newQuery
    const safeParse = CategoriaSchema.safeParse(req.body);

    if (!safeParse.success) {
        res.status(400).json(safeParse.error.errors);
    } else {
        const result = await repository.categoria.update(safeParse.data, query.id);
        res.status(200).json(result);
    }
}

export default {get, create, update}