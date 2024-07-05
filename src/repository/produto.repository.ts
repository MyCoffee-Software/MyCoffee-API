import prisma from "../db";
import { Categoria, isCategoria } from "../models/categoria";
import { Produto } from "../models/produto";
import paginate from "../utils/paginate";
import Categorias from "./categoria.repositoy";
import produtoCategoriaRepository from "./produtoCategoria.repository";

async function getById(id: number): Promise<Produto>{
    const queryResult = await prisma.produto.findUnique({
        where: {idProduto: id, excluido: false}
    })

    if (queryResult != undefined){
        const produto: Produto = {
            id: Number(queryResult.idProduto),
            nome: queryResult.nomeProduto,
            descricao: queryResult.descricaoProduto,
            marca: queryResult.marca,
            desconto_porcentual: queryResult.descontoPorcentualProduto,
            preco: queryResult.preco,
            codigo_de_barras: queryResult.codigoDeBarras,
            excluido: queryResult.excluido,
        }

        produto.imagens = (await prisma.imagensProduto.findMany({
            where: {idProduto: id}
        })).map((r) => r.caminho)

        return produto;
    }
}

async function getAll(paginacao: {pagina: number, limite: number}): Promise<Produto[]>{
    const queryResult = await prisma.produto.findMany({
        take: paginacao.limite, 
        skip: paginacao.limite*(paginacao.pagina - 1),
        where: {excluido: false}
    })

    if (queryResult != undefined){
        const produtos: Produto[] = await Promise.all(queryResult.map(async (r) => {
            const produto: Produto = {
                id: Number(r.idProduto),
                nome: r.nomeProduto,
                descricao: r.descricaoProduto,
                marca: r.marca,
                desconto_porcentual: r.descontoPorcentualProduto,
                preco: r.preco,
                codigo_de_barras: r.codigoDeBarras,
                excluido: r.excluido,
            }

            return produto;
        
        }))

        await Promise.all(produtos.map(async (produto) => {
            produto.imagens = (await prisma.imagensProduto.findMany({
                where: {idProduto: produto.id}
            })).map((r) => r.caminho)
        }))

        return produtos
    }
}

async function getByTexto(paginacao: {pagina: number, limite: number}, texto: string): Promise<Produto[]> {    
    const queryResult = await prisma.produto.findMany({
    take: paginacao.limite, 
    skip: paginacao.limite*(paginacao.pagina - 1),
    where: {excluido: false,
        OR: [
            {descricaoProduto: {contains: texto}},
            {nomeProduto: {contains: texto}},
            {marca: {contains: texto}}
        ]}
    
    })

    if (queryResult != undefined){
        const produtos: Produto[] = await Promise.all(queryResult.map( async(r) => {
            const produto: Produto = {
                id: Number(r.idProduto),
                nome: r.nomeProduto,
                descricao: r.descricaoProduto,
                marca: r.marca,
                desconto_porcentual: r.descontoPorcentualProduto,
                preco: r.preco,
                codigo_de_barras: r.codigoDeBarras,
                excluido: r.excluido,
            }

            return produto;
    
        }))
        await Promise.all(produtos.map(async (produto) => {
            produto.imagens = (await prisma.imagensProduto.findMany({
                where: {idProduto: produto.id}
            })).map((r) => r.caminho)
        }))

        return produtos
    }
    
}

async function getByCategoria(paginacao: {pagina: number, limite: number}, idCategoria: number): Promise<Produto[]>{
    const queryResult = (await prisma.produtosCategoria.findMany({
        where: {idCategorias: idCategoria},
        include: {produto: true}
    }))
    .map((r) => r.produto)
    .filter((p) => !p.excluido)

    if (queryResult != undefined){
        const produtos: Produto[] = await Promise.all(queryResult.map(async (r) => {
            const produto: Produto = {
                id: Number(r.idProduto),
                nome: r.nomeProduto,
                descricao: r.descricaoProduto,
                marca: r.marca,
                desconto_porcentual: r.descontoPorcentualProduto,
                preco: r.preco,
                codigo_de_barras: r.codigoDeBarras,
                excluido: r.excluido,
            }

            return produto;
        }))

        await Promise.all(produtos.map(async (produto) => {
            produto.imagens = (await prisma.imagensProduto.findMany({
                where: {idProduto: produto.id}
            })).map((r) => r.caminho)
        }))

        return paginate(produtos, paginacao.pagina, paginacao.limite);
    }

}

async function getByCategoriaTexto(paginacao: {pagina: number, limite: number}, idCategoria: number, texto: string): Promise<Produto[]> {
    const queryResult = (await prisma.produtosCategoria.findMany({
        where: {idCategorias: idCategoria},
        include: {produto: true}
    }))
    .map((r) => r.produto)
    .filter((p) => !p.excluido)
    .filter((p) => {
        return (p.descricaoProduto.includes(texto) || p.nomeProduto.includes(texto) || p.marca.includes(texto))
    })

    if (queryResult != undefined){
        const produtos: Produto[] = await Promise.all(queryResult.map(async (r) => {
            const produto: Produto = {
                id: Number(r.idProduto),
                nome: r.nomeProduto,
                descricao: r.descricaoProduto,
                marca: r.marca,
                desconto_porcentual: r.descontoPorcentualProduto,
                preco: r.preco,
                codigo_de_barras: r.codigoDeBarras,
                excluido: r.excluido,
            }

            return produto;
        }))

        await Promise.all(produtos.map(async (produto) => {
            produto.imagens = (await prisma.imagensProduto.findMany({
                where: {idProduto: produto.id}
            })).map((r) => r.caminho)
        }))

        return paginate(produtos, paginacao.pagina, paginacao.limite);
    }    
}

async function create(novoProduto: Produto): Promise<Produto> {
    const data = {
        nomeProduto: novoProduto.nome,
        descricaoProduto: novoProduto.descricao,
        marca: novoProduto.marca,
        descontoPorcentualProduto: novoProduto.desconto_porcentual,
        preco: novoProduto.preco,
        codigoDeBarras: novoProduto.codigo_de_barras,
        excluido: false
    }

    console.log(data)
    const queryResult = await prisma.produto.create({
        data
    })

    if (queryResult != undefined) {
        const produto: Produto = {
            id: Number(queryResult.idProduto),
            nome: queryResult.nomeProduto,
            descricao: queryResult.descricaoProduto,
            marca: queryResult.marca,
            desconto_porcentual: queryResult.descontoPorcentualProduto,
            preco: queryResult.preco,
            codigo_de_barras: queryResult.codigoDeBarras,
            excluido: queryResult.excluido,
        }


        const promises = novoProduto.imagens.map(async (i) => {
            return await prisma.imagensProduto.create({
                data: {
                    idProduto: Number(queryResult.idProduto),
                    caminho: i
                }
            })
        })
        const imagensProduto = await Promise.all(promises)
        produto.imagens = imagensProduto.map((i) => i.caminho)

        return produto;
    }
}

async function update(novoProduto: Produto, idProduto: number): Promise<Produto> {
    const queryResult = await prisma.produto.update({
        data: {
            nomeProduto: novoProduto.nome,
            descricaoProduto: novoProduto.descricao,
            marca: novoProduto.marca,
            descontoPorcentualProduto: novoProduto.desconto_porcentual,
            preco: novoProduto.preco,
            codigoDeBarras: novoProduto.codigo_de_barras,
        },
        where: {
            idProduto, excluido: false
        }
    })

    if (queryResult != undefined) {
        const produto: Produto = {
            id: Number(queryResult.idProduto),
            nome: queryResult.nomeProduto,
            descricao: queryResult.descricaoProduto,
            marca: queryResult.marca,
            desconto_porcentual: queryResult.descontoPorcentualProduto,
            preco: queryResult.preco,
            codigo_de_barras: queryResult.codigoDeBarras,
            excluido: queryResult.excluido,
        }

        const promises = novoProduto.imagens.map(async (i) => {
            return await prisma.imagensProduto.create({
                data: {
                    idProduto: Number(queryResult.idProduto),
                    caminho: i
                }
            })
        })
        const imagensProduto = await Promise.all(promises)
        produto.imagens = imagensProduto.map((i) => i.caminho)

        return produto;
    }
}

async function Delete(idProduto: number): Promise<Produto> {
    const queryResult = await prisma.produto.update({
        data: {
            excluido: true
        },
        where: {
            idProduto
        }
    })

    if (queryResult != undefined) {
        const produto: Produto = {
            id: Number(queryResult.idProduto),
            nome: queryResult.nomeProduto,
            descricao: queryResult.descricaoProduto,
            marca: queryResult.marca,
            desconto_porcentual: queryResult.descontoPorcentualProduto,
            preco: queryResult.preco,
            codigo_de_barras: queryResult.codigoDeBarras,
            excluido: queryResult.excluido,
        }

        return produto;
    }
}

export default {getById, getAll, getByCategoria, getByTexto, getByCategoriaTexto, create, update, Delete }