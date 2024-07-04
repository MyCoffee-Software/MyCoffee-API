import { Request, Response } from "express";
import repository from "../repository/repository";
import { Usuario } from "../models/usuario";

async function create(req: Request, res: Response) {
    const User = req.user as Usuario
    const Body = req.body
    const result = await repository.compra.create(Body, req.user?.id)

    if (result != undefined) {
        result.produtos = await repository.itemCompra.createMany(Body.produtos, result.idCompra)

        res.status(200).json(result)
    }
}

export default { create }