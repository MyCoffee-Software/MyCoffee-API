import prisma from "../db";
import { Cargo } from "../models/cargo";
import { Funcionario } from "../models/funcionario";
import { isPermissao } from "../models/permissao";


async function getByFuncionario(Funcionario: Funcionario): Promise<Cargo>{
  const queryCargo = await prisma.cargo.findUnique({where: {idCargo: Funcionario.idCargo}, include: {permissaoCargo: true}})
  if (queryCargo){
    const Cargo: Cargo = {
        nome: queryCargo.nome,
        permissoes : queryCargo.permissaoCargo.map((permissao) => isPermissao(permissao)? permissao : null),
        excluido: queryCargo.excluido,
    }
    return Cargo
  }
}

export default {getByFuncionario}