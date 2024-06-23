import prisma from "../db"
import { Permissao, isPermissao, isPermissoes } from "../models/permissao"

async function createMany(novasPermissoes: Permissao[], idCargo: bigint):  Promise<Permissao[]>{
    const queryResult = await prisma.permissaoCargo.createManyAndReturn({
        data: novasPermissoes.map((permissao) => {
            return {idCargo, permissao}
        })
    })

    if (queryResult){
        const permissoes = (
            queryResult
            .map((r) => r.permissao)
            .filter((r) => isPermissao(r))
        )

        if (isPermissoes(permissoes)){
            return permissoes
        }
    }
}

export default {createMany}