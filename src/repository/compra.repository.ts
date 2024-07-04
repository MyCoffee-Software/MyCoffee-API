import prisma from "../db";
import { Compra } from "../models/compra";

async function create(novaCompra: Compra, idCliente: number): Promise<Compra> {
    const queryResult = await prisma.compra.create({
        data: {
            idCliente,
            cpfComprador: novaCompra.cpfComprador,
            dataPagamento: novaCompra.dataPagamento,
            formaPagamento: novaCompra.formaPagamento,
            enderecoEntrega: novaCompra.enderecoEntrega,
            excluido: false,
        }
    })

    if (queryResult != undefined) {
        const compra: Compra = {
            idCompra: Number(queryResult.idCompra),
            idCliente: Number(queryResult.idCliente),
            cpfComprador: queryResult.cpfComprador,
            dataPagamento: queryResult.dataPagamento,
            formaPagamento: queryResult.formaPagamento,
            enderecoEntrega: queryResult.enderecoEntrega,
        }

        return compra
    }
}

export default { create }
