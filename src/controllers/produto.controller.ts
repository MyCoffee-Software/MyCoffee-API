import { Request, Response } from "express";
import repository from "../repository/repository";

async function GetProdutos(res: Response, req: Request) {
    const id = Number(req.query.id)
    const categoria = Number(req.query.categoria)
    const texto = req.query.texto
    const pagina = Number(req.query.pagina)
    const limite = Number(req.query.limite)

    if (id != undefined && id > 0){
        return repository.produto.getById(id)
    } 

    
}

export function CriarPedido(res: Response, req: Request) {
    res.status(200).json({msg: 'função criar pedido'})
}

export default {
}