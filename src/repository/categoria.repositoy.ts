import prisma from "../db";
import { Categoria } from "../models/categoria";
import { Produto } from "../models/produto";

async function getByProduto(produto: Produto){
    const queryResult = (await prisma.produtosCategoria.findMany({
         where: {idProdutos: produto.id},
         include: {categoria: true}
    })).map((r) => r.categoria)

    if (queryResult != undefined){
        const categorias: Categoria[] = queryResult.map((c): Categoria => {
            return {
                id: c.idCategoria,
                nome: c.nomeCategoria,
                excluido: c.excluidoCategoria
            }
        })

        return categorias
    }
}

export default {getByProduto}