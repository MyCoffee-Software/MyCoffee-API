import { Request, Response } from "express";
import repository from "../repository/repository";

async function create(req: Request, res: Response) {
    const Body = req.body
    const result = await repository.compra.create(Body)

    if (result != undefined) {
        result.produtos = await repository.itemCompra.createMany(Body.produtos, result.idCompra)

        res.status(200).json(result)
    }
}

export default { create }