import prisma from "../db"
import { Cargo } from "../models/cargo"
import { Permissao, isPermissao, isPermissoes } from "../models/permissao"

async function createMany(novasPermissoes: Permissao[], idCargo: number):  Promise<Permissao[]>{
    const queryResult = await prisma.permissaoCargo.createManyAndReturn({
        data: novasPermissoes.map((permissao) => {
            return {idCargo: idCargo, permissao: permissao}
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

async function getByCargo(cargo: Cargo): Promise<Permissao[]> {
    const queryResult = await prisma.permissaoCargo.findMany({
        select: { permissao: true},
        where: {idCargo: cargo.id}
    })

    if (queryResult.length > 0){
        const permissoes = queryResult.map((r) => r.permissao)
        if(isPermissoes(permissoes)) return permissoes
    }
}

async function updateByCargo(cargo: Cargo, novasPermissoes: Permissao[]): Promise <Permissao[]>{
    if (isPermissoes(novasPermissoes)){
        const queryResult = await prisma.permissaoCargo.deleteMany({
            where: {idCargo: cargo.id},
        })

        if (queryResult){
            return await createMany(novasPermissoes, cargo.id)
        }        
    }

}

export default {createMany, getByCargo, updateByCargo}