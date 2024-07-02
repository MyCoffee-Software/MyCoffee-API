import prisma from "../db";
import { Categoria } from "../models/categoria";
import { Produto } from "../models/produto";
import repository from './repository';

async function createMany(novasCategorias: number[], idProdutos: number): Promise<Categoria[]>{
    await prisma.produtosCategoria.deleteMany({
        where: {idProdutos}
    })
    
    const queryResult = await prisma.produtosCategoria.createManyAndReturn({
        data: novasCategorias.map((c) => {
            return {idProdutos: idProdutos, idCategorias: c}
        })
    })

    if (queryResult != undefined){
        const categorias: Categoria[] = await repository.categoria.getByProduto(idProdutos)

        console.log(await repository.categoria.getById(1))
        return categorias
    }
}
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

export default {getByProduto, createMany}