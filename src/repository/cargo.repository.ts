import prisma from "../db";
import { Cargo } from "../models/cargo";
import { Funcionario } from "../models/funcionario";
import { isPermissao } from "../models/permissao";

export class CargoRepository { 
  async getByFuncionario(Funcionario: Funcionario){
    const queryCargo = await prisma.cargo.findUnique({where: {idCargo: Funcionario.idCargo}, include: {permissaoCargo: true}})
    const Cargo: Cargo = {
        nome: queryCargo.nome,
        permissoes : queryCargo.permissaoCargo.map((permissao) => isPermissao(permissao)? permissao : null),
        excluido: queryCargo.excluido,
    }
  }
}