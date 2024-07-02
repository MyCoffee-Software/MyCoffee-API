import { Request, Response, query } from "express";
import repository from "../repository/repository";
import { ProdutoSchema } from "../models/produto";

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

async function create(req: Request, res: Response) {
    const Body = req.body
    const result = await repository.produto.create(Body);
    return res.status(200).json(result);

}

async function update(req: Request, res: Response) {
    const Query = req.newQuery
    const Body = req.body
    const result = await repository.produto.update(Body, Query.id);
    res.status(200).json(result);

}

async function Delete(req: Request, res: Response) {
    const Query = req.newQuery
    const resultado = await repository.produto.Delete(Query.id)
    
    res.status(200).json(resultado)    
 
}

async function updateCategorias(req: Request, res: Response) {
    const Query = req.newQuery
    const Body = req.body
    const result = await repository.produtoCategoria.createMany(Body, Query.id)

    res.status(200).json(result)
}

export default { get, create, update, Delete, updateCategorias } 