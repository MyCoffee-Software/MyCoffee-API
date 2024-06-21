import prisma from "../db";
import { Cliente } from "../models/cliente";
import { Usuario } from "../models/usuario";

async function getByUsuario(usuario: Usuario): Promise<Cliente>{
    const queryCliente = await prisma.cliente.findUnique({where: {idCliente: usuario.id}})
    if( queryCliente != undefined){
        const Cliente: Cliente = {
            ...usuario,
            cpf: queryCliente.cpf,
            data_nascimento: queryCliente.dataNascimento,
            endereco: queryCliente.endereco,
            telefone: queryCliente.telefone,
            clienteExcluido: queryCliente.excluido
        }
        return Cliente
    }

}

export default {getByUsuario}