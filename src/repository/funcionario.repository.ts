import prisma from "../db";
import { Funcionario } from "../models/funcionario";
import { Usuario } from "../models/usuario";
import repository from "./repository";

async function getById(id: number): Promise<Funcionario>{
    const queryFuncionario = await prisma.funcionario.findUnique({where: {idFuncionario: id, excluido: false}})
    if (queryFuncionario != undefined){
        const funcionario: Funcionario = {
            id: Number(queryFuncionario.idFuncionario),
            excluido: queryFuncionario.excluido,
            idCargo: queryFuncionario.cargo ? Number(queryFuncionario.cargo) : undefined
        }            
        return funcionario
    }
}

async function getAll(paginacao: {pagina: number, limite:number}): Promise<Funcionario[]>{
    const queryResult = await prisma.funcionario.findMany({
        where: {excluido: false},
        skip: paginacao.limite*(paginacao.pagina-1), 
        take: paginacao.limite 
    })

    if(queryResult.length > 0){
        const funcionarios: Funcionario[] = queryResult.map((r) => {
            const funcionario: Funcionario = {
                idCargo: Number(r.cargo),
                id: Number(r.idFuncionario),
                excluido: r.excluido
            }

            return funcionario
        })

        return funcionarios
    } 
}

async function create(novoFuncionario: Funcionario): Promise<Funcionario>{
    const queryResult = await prisma.funcionario.create({
        data: {
            idFuncionario: novoFuncionario.id,
            cargo: novoFuncionario.idCargo,
            excluido: false
        }
    })

    if (queryResult != undefined) {
        const funcionario: Funcionario = {
            id: Number(queryResult.idFuncionario),
            idCargo: Number(queryResult.cargo),
            excluido: queryResult.excluido
        }

        return funcionario
    }
}

async function update(novoFuncionario: Funcionario, idFuncionario: number): Promise<Funcionario>{
    const queryResult = await prisma.funcionario.update({
        data: {
            cargo: novoFuncionario.idCargo
        },
        where: {
            idFuncionario, excluido: false
        }
    })

    if (queryResult != undefined){
        const funcionario: Funcionario = {
            id: Number(queryResult.idFuncionario),
            idCargo: Number(queryResult.cargo),
            excluido: queryResult.excluido
        }

        return funcionario
    }
}

async function Delete(idFuncionario: number): Promise<Funcionario> {
    const queryResult = await prisma.funcionario.update({
        data: {
            excluido: true
        },
        where: {
            idFuncionario
        }
    })    

    if (queryResult != undefined) {
        const funcionario: Funcionario = {
            id: Number(queryResult.idFuncionario),
            idCargo: Number(queryResult.cargo),
            excluido: queryResult.excluido
        }

        return funcionario
    }
}

export default {getById, getAll, create, update, Delete}
  