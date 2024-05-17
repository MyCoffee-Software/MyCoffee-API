import { Request, Response } from "express";

export function CriarPedido(res: Response, req: Request) {
    res.status(200).json({msg: 'função criar pedido'})
}