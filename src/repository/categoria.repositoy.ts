import { bigint } from "zod";
import prisma from "../db";
import { Categoria } from "../models/categoria";
import { Produto } from "../models/produto";

async function getByProduto(produto: Produto){
    /*
    const queryResult = (await prisma.produtosCategoria.findMany({
         where: {idProdutos: produto.id},
         include: {categoria: true}
    }))

    if (queryResult != undefined){
        const categorias: Categoria[] = queryResult.map((c): Categoria => {
            return {
                id: c.idCategoria,
                nome: c.nomeCategoria,
                excluido: c.excluidoCategoria
            }
        })

        return categorias
    }*/
}

async function getAll(paginacao: {pagina: number, limite: number}): Promise<Categoria[]> {
    const queryCategorias = await prisma.categoria.findMany({
        where: { excluidoCategoria: false },
        skip: paginacao.limite * (paginacao.pagina-1),
        take: paginacao.limite,
    })
    
    if (queryCategorias.length > 0) {
        const categorias: Categoria[] = queryCategorias.map((r) => {
            const categoria: Categoria = {
                id: Number(r.idCategoria),
                nome: r.nomeCategoria,
                excluido: r.excluidoCategoria,
            }

            return categoria;
        })

        return categorias;
    }
}

async function getById(id: number): Promise<Categoria> {
    const queryResult = await prisma.categoria.findUnique({
        where: { idCategoria: id }
    })

    if (queryResult != undefined && !queryResult.excluidoCategoria) {
        const categoria: Categoria = {
            id: Number(queryResult.idCategoria),
            nome: queryResult.nomeCategoria,
            excluido: queryResult.excluidoCategoria,
        }
        return categoria;
    }
    
    return null;
}

async function create(categoria: Categoria): Promise<Categoria> {
    const queryResult = await prisma.categoria.create({
        data: {
            nomeCategoria: categoria.nome,
            excluidoCategoria: false,
        }
    })

    if (queryResult != undefined) {
        const categoria: Categoria = {
            id: Number(queryResult.idCategoria),
            nome: queryResult.nomeCategoria,
            excluido: queryResult.excluidoCategoria,
        }

        return categoria;
    }
}

async function update(categoria: Partial<Categoria>, idCategoria: number) {
    const queryResult = await prisma.categoria.update({
        data: {
            nomeCategoria: categoria.nome
        },
        where: {idCategoria, excluidoCategoria: false }
    });

    if (queryResult != undefined) {
        const categoria: Categoria = {
            id: Number(queryResult.idCategoria),
            nome: queryResult.nomeCategoria,
            excluido: queryResult.excluidoCategoria
        }

        return categoria;
    }
}

async function Delete(idCategoria: number): Promise<Categoria> {
    const queryResult = await prisma.categoria.update({
        data: {
            excluidoCategoria: true
        },
        where: {
            idCategoria: idCategoria
        }
    })

    if (queryResult != undefined) {
        const categoria: Categoria = {
            id: Number(queryResult.idCategoria),
            nome: queryResult.nomeCategoria,
            excluido: queryResult.excluidoCategoria
        }

        return categoria;
    }
}

export default {getByProduto, getAll, getById, create, update, Delete}