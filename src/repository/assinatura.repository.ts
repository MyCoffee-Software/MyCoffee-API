import prisma from "../db";
import { Assinatura } from "../models/assinatura";

async function create(novaAssinatura: Assinatura, idCliente: number): Promise<Assinatura> {
    const queryResult = await prisma.assinatura.create({
        data: {
            idPlano: novaAssinatura.idPlano,
            idCliente,
            formaPagamento: novaAssinatura.formaPagamento,
            enderecoEntrega: novaAssinatura.enderecoEntrega,
            cpfSignatario: novaAssinatura.cpfSignatario,
            dataInicio: novaAssinatura.dataInicio,
            dataFim: novaAssinatura.dataFim,
            valor: novaAssinatura.valor,
            excluido: false
        }
    })

    if (queryResult != undefined) {
        const assinatura: Assinatura = {
            idAssinatura: Number(queryResult.idAssinatura),
            idPlano: Number(queryResult.idPlano),
            idCliente: Number(queryResult.idCliente),
            formaPagamento: queryResult.formaPagamento,
            enderecoEntrega: queryResult.enderecoEntrega,
            cpfSignatario: queryResult.cpfSignatario,
            dataInicio: queryResult.dataInicio,
            dataFim: queryResult.dataFim,
            valor: queryResult.valor,
        }

        return assinatura
    }
    
}

export default { create }