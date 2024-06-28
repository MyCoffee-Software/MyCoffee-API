import prisma from "../db";
import { Categoria } from "../models/categoria";
import { Produto } from "../models/produto";

async function getByProduto(produto: Produto): Promise <Categoria[]>{
    const queryResult = await prisma.produtosCategoria.findMany({
        include: {categoria: true},
        where: {idProdutos: produto.id}
    })

    if (queryResult){
        const categorias: Categoria[] = queryResult.map((r) => {
            const categoria: Categoria = {
                id: Number(r.categoria.idCategoria),
                nome: r.categoria.nomeCategoria,
                excluido: r.categoria.excluidoCategoria,
            }
            return categoria
        }).filter((c) => {
            return (!c.excluido)
        })

        return categorias
    }
}

export default {getByProduto}