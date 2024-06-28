import { Request, Response } from "express";
import repository from "../repository/repository";
import { z } from "zod";
import { clienteSchema } from "../models/cliente";

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

    if('id' in safeParse.data){
        const result = await repository.cliente.getById(safeParse.data.id)
        if (result != undefined){
            result.usuario = await repository.usuario.getById(result.id);
        }
        return res.status(200).json(result)
    }

    if ('pagina' in safeParse.data) {
        return res.status(200).send(await repository.cliente.getAll({
            pagina: safeParse.data.pagina,
            limite: safeParse.data.limite,
        }));
    }
}

async function create(req: Request, res: Response) {
    const safeParse = clienteSchema.safeParse(req.body);

    const usuario = await repository.usuario.create(safeParse.data.usuario);
    if (usuario != undefined){
        safeParse.data.id = usuario.id;
        const resultado = await repository.cliente.create(safeParse.data);
        resultado.usuario = usuario;
        res.status(200).json(resultado);
    }       
}

async function update(req: Request, res: Response) {
    const Query = req.newQuery
    const Body = req.body

    const usuario = await repository.usuario.update(Body.usuario, Query.id)
    if (usuario != undefined){
    const resultado = await repository.cliente.update(Body, Query.id)
        resultado.usuario = usuario
        res.status(200).json(resultado)
    }
}

async function Delete(req: Request, res: Response) {
    const Query = req.newQuery
    const cliente = await repository.cliente.Delete(Query.id)
    if (cliente != undefined) {
        cliente.usuario = await repository.usuario.Delete(Query.id)
        res.status(200).json(cliente)
    }
}

export default {get, create, update, Delete} 
