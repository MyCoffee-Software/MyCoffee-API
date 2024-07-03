import { itemCompra } from "@prisma/client";
import { ItemCompra } from "../models/itemCompra";
import prisma from "../db";

async function createMany(novosItens: ItemCompra[], idCompra: number): Promise<ItemCompra[]>{
    const queryResult = await prisma.itemCompra.createManyAndReturn({
        data: novosItens.map((i) => {
            return {
                idCompra,
                idProduto: i.idProduto,
                quantidade: i.quantidade,
                valor: i.valorUnitario,
            }
        })
    })

    if (queryResult != undefined){
        const itens: ItemCompra[] = queryResult.map((i) => {
            const item: ItemCompra = {
                idProduto: Number(i.idProduto),
                quantidade: Number(i.quantidade),
                valorUnitario: Number(i.valor),
            }
            return item
        })

        return itens
    }
}

export default {createMany}