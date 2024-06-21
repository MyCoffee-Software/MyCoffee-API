import prisma from "../db";
import { Usuario } from "../models/usuario";


async function getByEmail(email: string): Promise<Usuario>{
    const queryUsuario = await prisma.usuario.findUnique({where: {email}})

    if (queryUsuario){
        const usuario: Usuario = {
            id: queryUsuario.id,
            email: queryUsuario.email,
            senha: queryUsuario.senha,
            nomeCompleto: queryUsuario.nome_completo,
            excluido: queryUsuario.excluido,
        } 
        return usuario
    }

    return null
}

export default {getByEmail}