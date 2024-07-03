import prisma from "../db";
import { Assinatura } from "../models/assinatura";
import { Periodo } from "../models/periodo";

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

async function estender(extensao: Periodo, idCliente: number): Promise<Assinatura> {
    const assinaturaVigente = await getVigente(idCliente)
    const idAssinatura = assinaturaVigente.idAssinatura

    const dias = extensao === "Mensal"? 30 : 365
    const dataFim = new Date(assinaturaVigente.dataFim)
    dataFim.setDate(dataFim.getDate() + dias)

    const queryResult = await prisma.assinatura.update({
        where: {
            idAssinatura
        },
        data: {
            dataFim
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

async function cancelar(idCliente: number) {
    const assinaturaVigente = await getVigente(idCliente)
    const idAssinatura = assinaturaVigente.idAssinatura

    const dataFim = new Date(assinaturaVigente.dataFim)
    dataFim.setDate(dataFim.getDate() - 1)

    const queryResult = await prisma.assinatura.update({
        where: {
            idAssinatura
        },
        data: {
            dataFim,
            excluido: true
        }
    })
    
}

async function getVigente(idCliente: number): Promise<Assinatura>{
    const result = await prisma.assinatura.findFirst({
        where: {
            idCliente,
            dataFim: {
                gte: new Date()
            },
            excluido: false
        },
        orderBy: {
            dataFim: 'desc'
        }
    })

    if (result != undefined) {
        const assinatura: Assinatura = {
            idAssinatura: Number(result.idAssinatura),
            idPlano: Number(result.idPlano),
            idCliente: Number(result.idCliente),
            formaPagamento: result.formaPagamento,
            enderecoEntrega: result.enderecoEntrega,
            cpfSignatario: result.cpfSignatario,
            dataInicio: result.dataInicio,
            dataFim: result.dataFim,
            valor: result.valor,
        }

        return assinatura
    }
}

export default { create, estender, getVigente, cancelar }