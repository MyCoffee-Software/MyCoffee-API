import { Request, Response, query } from "express";
import repository from "../repository/repository";

async function get(req: Request, res: Response ) {
    const Query = req.newQuery
    console.log(req.query, req.newQuery, req.user)

    if ('id' in Query) {
        const result = await repository.produto.getById(Query.id)
        if (result != undefined){
            result.categorias = await repository.produtoCategoria.getByProduto(result)
        }

        return res.status(200).json(result)
    }

    if ("pagina" in Query && 'limite' in Query){
        if ("categoria" in Query) {
            if ("texto" in Query){
                console.log(1)
                return res.status(200).json(await repository.produto.getByCategoriaTexto({
                    pagina: Query.pagina,
                    limite: Query.limite
                }, Query.categoria, Query.texto))
            } else {
                console.log(2)
                return res.status(200).json(await repository.produto.getByCategoria({
                    pagina: Query.pagina,
                    limite: Query.limite
                }, Query.categoria))

            }
        } else {
            if ("texto" in Query){
                console.log(3)
                return res.status(200).json(await repository.produto.getByTexto({
                    pagina: Query.pagina,
                    limite: Query.limite
                },  Query.texto))
            } else {
                console.log(4, Query.texto)
                return res.status(200).json(await repository.produto.getAll({
                    pagina: Query.pagina,
                    limite: Query.limite
                }))
            }

        }
    }
    
}

export default { get } 