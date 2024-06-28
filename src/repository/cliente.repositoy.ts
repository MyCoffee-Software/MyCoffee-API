import prisma from "../db";
import { Cliente } from "../models/cliente";
import { Usuario } from "../models/usuario";

async function getByUsuario(usuario: Usuario): Promise<Cliente> {
    const queryCliente = await prisma.cliente.findUnique({ where: { idCliente: usuario.id } })
    if (queryCliente != undefined) {
        const Cliente: Cliente = {
            ...usuario,
            cpf: queryCliente.cpf,
            data_nascimento: queryCliente.dataNascimento,
            endereco: queryCliente.endereco,
            telefone: queryCliente.telefone,
            excluido: queryCliente.excluido
        }
        return Cliente
    }
}

async function getById(id: number): Promise<Cliente> {
    const queryCliente = await prisma.cliente.findUnique({
        where: { idCliente: id, excluido: false }
    });

    if (queryCliente != undefined) {
        const cliente: Cliente = {
            id: Number(queryCliente.idCliente),
            cpf: queryCliente.cpf,
            endereco: queryCliente.endereco,
            data_nascimento: queryCliente.dataNascimento,
            telefone: queryCliente.telefone,
            excluido: queryCliente.excluido,
        };
        return cliente;
    }
}

async function getAll(paginacao: { pagina: number, limite: number }): Promise<Cliente[]> {
    const queryResult = await prisma.cliente.findMany({
        where: { excluido: false },
        skip: paginacao.limite * (paginacao.pagina - 1),
        take: paginacao.limite
    })

    if (queryResult.length > 0) {
        const clientes: Cliente[] = queryResult.map((r) => {
            const cliente: Cliente = {
                id: Number(r.idCliente),
                cpf: r.cpf,
                endereco: r.endereco,
                data_nascimento: r.dataNascimento,
                telefone: r.telefone,
                excluido: r.excluido,
            };
            return cliente;
        });

        return clientes;
    }
}

async function create(novoCliente: Cliente): Promise<Cliente>{
    const queryResult = await prisma.cliente.create({
        data: {
            idCliente: novoCliente.id,
            cpf: novoCliente.cpf,
            endereco: novoCliente.endereco,
            dataNascimento: novoCliente.data_nascimento,
            telefone: novoCliente.telefone,
            excluido: false
        }
    });

    if (queryResult != undefined) {
        const cliente: Cliente = {
            id: Number(queryResult.idCliente),
            cpf: queryResult.cpf,
            endereco: queryResult.endereco,
            data_nascimento: queryResult.dataNascimento,
            telefone: queryResult.telefone,
            excluido: queryResult.excluido,
        };

        return cliente;
    }
}

async function update(novoCliente: Cliente, idCliente: number): Promise<Cliente>{
    const queryResult = await prisma.cliente.update({
        data: {
            cpf: novoCliente.cpf,
            endereco: novoCliente.endereco,
            dataNascimento: novoCliente.data_nascimento,
            telefone: novoCliente.telefone,
        },
        where: {
            idCliente, excluido: false
        }
    });

    if (queryResult != undefined){
        const cliente: Cliente = {
            id: Number(queryResult.idCliente),
            cpf: queryResult.cpf,
            endereco: queryResult.endereco,
            data_nascimento: queryResult.dataNascimento,
            telefone: queryResult.telefone,
            excluido: queryResult.excluido,
        };

        return cliente;
    }
}

async function Delete(idCliente: number): Promise<Cliente> {
    const queryResult = await prisma.cliente.update({
        data: {
            excluido: true
        },
        where: {
            idCliente
        }
    })    

    if (queryResult != undefined) {
        const cliente: Cliente = {
            id: Number(queryResult.idCliente),
            cpf: queryResult.cpf,
            endereco: queryResult.endereco,
            data_nascimento: queryResult.dataNascimento,
            telefone: queryResult.telefone,
            excluido: queryResult.excluido,
        };

        return cliente;
    }
}

export default { getByUsuario, getById, getAll, create, update, Delete }