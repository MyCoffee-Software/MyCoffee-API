import { Request, Response } from "express";
import repository from "../repository/repository";
import { Produto } from "../models/produto";

async function GetProdutos(res: Response, req: Request) {
    const id = Number(req.query.id)
    const categoria = Number(req.query.categoria)
    const texto = req.query.texto
    const pagina = Number(req.query.pagina)
    const limite = Number(req.query.limite)

    if (id != undefined && id > 0){
        return res.status(200).send(await repository.produto.getById(id))
    } 

    if(pagina == undefined || limite == undefined){
        return res.status(400).send({ error: "Parâmetros pagina e limite são obrigatórios" })
    }

    let produtos: Produto[] = undefined
    
    if (categoria != undefined){
        produtos = await repository.produto.getByCategoria(categoria, {pagina, limite})
    } else {
        produtos = await repository.produto.getAll({pagina, limite})
    }

    if (texto != undefined){
        produtos.filter((p) => {
            return (
                p.nome.includes(`${texto}`) ||
                p.descricao.includes(`${texto}`) ||
                p.marca.includes(`${texto}`)
            )
        })
    }
}

export function CriarPedido(res: Response, req: Request) {
    res.status(200).json({msg: 'função criar pedido'})
}

export default { GetProdutos } 