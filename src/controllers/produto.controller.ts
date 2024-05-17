import { Request, Response } from "express";

export function CriarPedido(res: Response, req: Request) {
    console.log(req.user?.nomeCompleto)
}