import prisma from "../db";
import { Funcionario } from "../models/funcionario";
import { Usuario } from "../models/usuario";

async function getByUsuario(usuario: Usuario): Promise<Funcionario>{
    const queryFuncionario = await prisma.funcionario.findUnique({where: {idFuncionario: usuario.id}})
    if (queryFuncionario != undefined){
        const Funcionario: Funcionario = {
            ...usuario,
            funcionarioExcluido: queryFuncionario.excluido,
            idCargo: queryFuncionario.cargo ? queryFuncionario.cargo : undefined
        }            
        return Funcionario
    }

}

export default {getByUsuario}