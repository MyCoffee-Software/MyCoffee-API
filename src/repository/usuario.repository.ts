import prisma from "../db";
import { Usuario } from "../models/usuario";
import bycript from 'bcrypt'

const BYCRIPT_ROUNDS =  10

async function getByEmail(email: string): Promise<Usuario>{
    const queryUsuario = await prisma.usuario.findUnique({
        select: {
            id: true,
            nome_completo: true,
            email: true,
            imagem: true,
            excluido: true,
        },
        where: {email, excluido: false}
    })

    if (queryUsuario != undefined && !queryUsuario.excluido){
        const usuario: Usuario = {
            id: Number(queryUsuario.id),
            email: queryUsuario.email,
            nomeCompleto: queryUsuario.nome_completo,
            excluido: queryUsuario.excluido,
            imagem: queryUsuario.imagem,
        } 
        return usuario
    }

    return null
}

async function getById(id: number): Promise<Usuario> {
    const queryUsuario = await prisma.usuario.findUnique({
        select: {
            id: true,
            nome_completo: true,
            email: true,
            imagem: true,
            excluido: true,
        },
        where: {id, excluido: false}
    })

    if (queryUsuario != undefined && !queryUsuario.excluido){
        const usuario: Usuario = {
            id: Number(queryUsuario.id),
            email: queryUsuario.email,
            nomeCompleto: queryUsuario.nome_completo,
            excluido: queryUsuario.excluido,
            imagem: queryUsuario.imagem,
        } 
        return usuario
    }

    return null    
}

async function verifyPassword(email: string, senha: string): Promise<boolean>{
    const queryUsuario = await prisma.usuario.findUnique({where: {email, excluido: false}})
    if (queryUsuario != undefined){
        const usuarioPassword = queryUsuario.senha
        const validPassword = bycript.compare(senha, usuarioPassword)
        return validPassword
    }

    return false
    
}

async function create(novoUsuario: Usuario): Promise<Usuario>{
    const data = {
        nome_completo: novoUsuario.nomeCompleto,
        email: novoUsuario.email,
        senha: await bycript.hash(novoUsuario.senha, BYCRIPT_ROUNDS),
        imagem: novoUsuario.imagem,
        excluido: false        
    }

    const queryResult = await prisma.usuario.create({
        select: {
            id: true,
            nome_completo: true,
            email: true,
            imagem: true,
            excluido: true
        },
        data
    })

    if (queryResult != undefined) {
        const usuario: Usuario = {
            id: Number(queryResult.id),
            nomeCompleto: queryResult.nome_completo,
            email: queryResult.email,
            imagem: queryResult.imagem,
            excluido: queryResult.excluido
        }

        return usuario
    }


}

async function update(novoUsuario: Partial<Usuario>, idUsuario: number): Promise<Usuario> {
    const data = {
        nome_completo: novoUsuario.nomeCompleto,
        email: novoUsuario.email,
        imagem: novoUsuario.imagem,
        excluido: false
    }

    const queryResult = await prisma.usuario.update({
        select: {
            id: true,
            nome_completo: true,
            email: true,
            imagem: true,
            excluido: true
        },
        data,
        where: {
            id: idUsuario
        }
    })

    if (queryResult != undefined) {
        const usuario: Usuario = {
            id: Number(queryResult.id),
            nomeCompleto: queryResult.nome_completo,
            email: queryResult.email,
            imagem: queryResult.imagem,
            excluido: queryResult.excluido
        }

        return usuario
    }
    
}

async function Delete(id: number): Promise <Usuario> {
    const queryResult = await prisma.usuario.update({
        data: {excluido: true},
        where: {id}
    })

    if (queryResult != undefined){
        const usuario: Usuario = {
            id: Number(queryResult.id),
            email: queryResult.email,
            nomeCompleto: queryResult.nome_completo,
            imagem: queryResult.imagem,
            excluido: queryResult.excluido
        }

        return usuario
    }
}
export default {getByEmail, getById, verifyPassword, create, update, Delete}