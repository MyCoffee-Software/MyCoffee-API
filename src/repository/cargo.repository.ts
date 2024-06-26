import prisma from "../db";
import { Cargo } from "../models/cargo";
import { Funcionario } from "../models/funcionario";
import { Permissao, isPermissao } from "../models/permissao";


async function getByFuncionario(Funcionario: Funcionario): Promise<Cargo>{
  const queryCargo = await prisma.cargo.findUnique({where: {idCargo: Funcionario.idCargo, excluido: false}, include: {permissaoCargo: true}})
  if (queryCargo){
    const Cargo: Cargo = {
        id: Number(queryCargo.idCargo),
        nome: queryCargo.nome,
        permissoes : queryCargo.permissaoCargo.map((permissao) => isPermissao(permissao)? permissao : null),
        excluido: queryCargo.excluido,
    }
    return Cargo
  }
}

async function getById(id: number): Promise<Cargo>{
  const queryResult = await prisma.cargo.findUnique({where: {idCargo: id, excluido: false}, include: {permissaoCargo: true}})

  if(queryResult){
    const cargo:Cargo = {
      id: Number(queryResult.idCargo),
      nome: queryResult.nome,
      excluido: queryResult.excluido,
    }
  
    return cargo
  }
}

async function getAll(paginacao: {pagina: number, limite: number}): Promise<Cargo[]>{
  const queryResult = await prisma.cargo.findMany({
    where: {excluido: false},
    skip: paginacao.limite*(paginacao.pagina-1), 
    take: paginacao.limite, })

  if(queryResult.length > 0){
    const cargos: Cargo[] = queryResult.map((r) => {
      const cargo: Cargo = {
        id: Number(r.idCargo),
        nome: r.nome,
        excluido: r.excluido,
      }
    
      return cargo
      
    })

    return cargos
  }
}

async function create(novoCargo: Cargo): Promise<Cargo> {
  const queryResult = await prisma.cargo.create({
    data: {
      nome: novoCargo.nome,
      excluido: false
    }
  })

  if (queryResult != undefined){
    const cargo: Cargo = {
      id: Number(queryResult.idCargo),
      nome: queryResult.nome,
      excluido: queryResult.excluido,
    }

    return cargo
  }
}

async function update(novoCargo: Partial<Cargo>, idCargo: number){
  const queryResult = await prisma.cargo.update({
   data: novoCargo,
   where: {idCargo, excluido: false} 
  })

  if (queryResult != undefined){
    const cargo: Cargo = {
      id: Number(queryResult.idCargo),
      nome: queryResult.nome,
      excluido: queryResult.excluido
    }

    return cargo
  }
}

export default {getByFuncionario, getById, getAll, create, update}