import prisma from "../db";
import { Admin } from "../models/admin";
import { Usuario } from "../models/usuario";

async function getByUsuario(usuario: Usuario): Promise<Admin>{
    const queryAdmin = await prisma.admin.findUnique({where: {idAdmin: usuario.id}})
    console.log(queryAdmin)
    if (queryAdmin != undefined){
        const Admin: Admin = {
            ...usuario,
            adminExcluido: queryAdmin.excluido
        }
        return Admin
    }
}

export default {getByUsuario}