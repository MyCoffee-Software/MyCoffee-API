import prisma from "../db";
import { Admin } from "../models/admin";
import { Usuario } from "../models/usuario";

export class AdminRepository {
    async getByUsuario(usuario: Usuario): Promise<Admin>{
        const queryAdmin = await prisma.admin.findUnique({where: {idAdmin: usuario.id}})
        if (queryAdmin != undefined){
            const Admin: Admin = {
                ...usuario,
                adminExcluido: queryAdmin.excluido
            }
            return Admin
        }
    }
}