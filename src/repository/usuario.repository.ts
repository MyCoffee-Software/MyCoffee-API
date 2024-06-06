import prisma from "../db";
import { Usuario } from "../models/usuario";

export class UsuarioRepository {
    async getByEmail(email: string): Promise<Usuario>{
        const queryUsuario = await prisma.usuario.findUnique({where: {email}})
        const usuario: Usuario = {
            id: queryUsuario.id,
            email: queryUsuario.email,
            senha: queryUsuario.senha,
            nomeCompleto: queryUsuario.nome_completo,
            excluido: queryUsuario.excluido,
        } 
        return usuario
    }
}