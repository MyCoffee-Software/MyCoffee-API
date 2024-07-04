import prisma from "../db";
import { Plano } from "../models/plano";

async function getAll(paginacao: { pagina: number, limite: number }): Promise<Plano[]> {
    const queryPlanos = await prisma.planoAssinatura.findMany({
        where: { excluido: false },
        skip: paginacao.limite * (paginacao.pagina - 1),
        take: paginacao.limite
    });

    if (queryPlanos.length > 0) {
        const planos: Plano[] = await Promise.all(queryPlanos.map(async (r) => {
            const plano: Plano = {
                id: Number(r.idPlanoAssinatura),
                nome: r.nomePlanoAssinatura,
                desconto: Number(r.descontoPorcentual),
                precoMensal: Number(r.precoMensal),
                precoAnual: Number(r.precoAnual),
                ativo: r.ativo,
                descricao: r.descricao,
                excluido: r.excluido,
            }

            plano.imagens = await prisma.imagensPlano.findMany({
                where: { idPlano: plano.id }
            }).then((r) => r.map((r) => r.caminho));

            return plano;
        }))

        return planos;
    }
}

async function getById(id: number): Promise<Plano> {
    const queryResult = await prisma.planoAssinatura.findUnique({
        where: { idPlanoAssinatura: id }
    })

    if (queryResult != undefined && !queryResult.excluido) {
        const plano: Plano = {
            id: Number(queryResult.idPlanoAssinatura),
            nome: queryResult.nomePlanoAssinatura,
            desconto: Number(queryResult.descontoPorcentual),
            precoMensal: Number(queryResult.precoMensal),
            precoAnual: Number(queryResult.precoAnual),
            ativo: queryResult.ativo,
            descricao: queryResult.descricao,
            excluido: queryResult.excluido,
        }

        plano.imagens = await prisma.imagensPlano.findMany({
            where: { idPlano: plano.id }
        }).then((r) => r.map((r) => r.caminho));

        return plano;
    }

    return null;
}

async function create(plano: Plano): Promise<Plano> {
    const queryResult = await prisma.planoAssinatura.create({
        data: {
            nomePlanoAssinatura: plano.nome,
            descontoPorcentual: plano.desconto,
            precoMensal: plano.precoMensal,
            precoAnual: plano.precoAnual,
            ativo: plano.ativo,
            descricao: plano.descricao,
            excluido: false,
        }
    })

    if (queryResult != undefined) {
        const plano: Plano = {
            id: Number(queryResult.idPlanoAssinatura),
            nome: queryResult.nomePlanoAssinatura,
            desconto: Number(queryResult.descontoPorcentual),
            precoMensal: Number(queryResult.precoMensal),
            precoAnual: Number(queryResult.precoAnual),
            ativo: queryResult.ativo,
            descricao: queryResult.descricao,
            excluido: queryResult.excluido,
        }

        const promises = plano.imagens.map(async (i) => {
            return await prisma.imagensPlano.create({
                data: {
                    caminho: i,
                    idPlano: plano.id
                }
            })
        })
        const imagensPlano = await Promise.all(promises);
        plano.imagens = imagensPlano.map((r) => r.caminho);

        return plano;
    }
}

async function update(plano: Partial<Plano>, idPlanoAssinatura: number) {
    const queryResult = await prisma.planoAssinatura.update({
        data: {
            nomePlanoAssinatura: plano.nome,
            descontoPorcentual: plano.desconto,
            precoMensal: plano.precoMensal,
            precoAnual: plano.precoAnual,
            ativo: plano.ativo,
            descricao: plano.descricao,
        },
        where: { idPlanoAssinatura, excluido: false }
    });

    if (queryResult != undefined) {
        const plano: Plano = {
            id: Number(queryResult.idPlanoAssinatura),
            nome: queryResult.nomePlanoAssinatura,
            desconto: Number(queryResult.descontoPorcentual),
            precoMensal: Number(queryResult.precoMensal),
            precoAnual: Number(queryResult.precoAnual),
            ativo: queryResult.ativo,
            descricao: queryResult.descricao,
            excluido: queryResult.excluido,
        }

        const promises = plano.imagens.map(async (i) => {
            return await prisma.imagensPlano.create({
                data: {
                    caminho: i,
                    idPlano: plano.id
                }
            })
        })
        const imagensPlano = await Promise.all(promises);
        plano.imagens = imagensPlano.map((r) => r.caminho);

        return plano;
    }
}

async function Delete(idPlanoAssinatura: number): Promise<Plano> {
    const queryResult = await prisma.planoAssinatura.update({
        data: {
            excluido: true
        },
        where: {
            idPlanoAssinatura: idPlanoAssinatura
        }
    })

    if (queryResult != undefined) {
        const plano: Plano = {
            id: Number(queryResult.idPlanoAssinatura),
            nome: queryResult.nomePlanoAssinatura,
            desconto: Number(queryResult.descontoPorcentual),
            precoMensal: Number(queryResult.precoMensal),
            precoAnual: Number(queryResult.precoAnual),
            ativo: queryResult.ativo,
            descricao: queryResult.descricao,
            excluido: queryResult.excluido,
        }

        return plano;
    }
}

export default { getAll, getById, create, update, Delete }
