import prisma from "../db";
import { Categoria } from "../models/categoria";
import repository from "./repository";

async function createMany(novasCategorias: number[], idPlano: number): Promise<Categoria[]>{
    await prisma.planoCategoria.deleteMany({
        where: {idPlano}
    })

    const queryResult = await prisma.planoCategoria.createManyAndReturn({
        data: novasCategorias.map((c) => {
            return {idPlano: idPlano, idCategoria: c}
        })
    })

    if (queryResult != undefined){
        const categorias: Categoria[] = await getByPlano(idPlano)
        return categorias
    }
}

async function getByPlano(idPlano: number): Promise<Categoria[]>{
    const queryResult = await prisma.planoCategoria.findMany({
        include: {categoria: true},
        where: {idPlano}
    })

    if (queryResult != undefined){
        const categorias: Categoria[] = queryResult.map((r) => {
            const categoria: Categoria = {
                id: Number(r.categoria.idCategoria),
                nome: r.categoria.nomeCategoria,
                excluido: r.categoria.excluidoCategoria
            }
            return categoria
        }).filter((c) => {
            return (!c.excluido)
        })

        return categorias
    }
}

export default {createMany, getByPlano}