import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import repository from "../repository/repository";
import { Usuario } from "../models/usuario";
import { Permissao } from "../models/permissao";

async function login(req: Request, res: Response) {
    const JWT_SECRET = process.env.JWT_SECRET
    const JWT_EXPIRATION = process.env.JWT_EXPIRATION
    const {email, senha} = req.body
    const usuario = await repository.usuario.getByEmail(email)


    if (!usuario) {
        res.status(400).json({
            error: 'Usuário inválido'
        })
    } else {
        const match = await repository.usuario.verifyPassword(email, senha)

        if (!match){
            res.status(400).json({
                error: 'Senha inválida'
            })
        }

        const payload = {
            user: {
                id: Number(usuario.id),
                nome: usuario.nomeCompleto,
                email: usuario.email,
                imagem: usuario.imagem,
            }
        }

        const token = jwt.sign(
            payload,
            JWT_SECRET as string,
            {expiresIn: JWT_EXPIRATION}
        )

        return res.status(200).json({ token })
    }
}

async function getPermissoes(usuario: Usuario): Promise<Permissao[]> {
    console.log(usuario)
    if (usuario === undefined){
        return []
    }

    const admin = await repository.admin.getByUsuario(usuario)
    if (admin !== undefined){
        return ['Administrador']
    }
        
    const funcionario = await repository.funcionario.getById(usuario.id) 
    if (funcionario !== undefined){
        const cargo = await repository.cargo.getById(funcionario.idCargo)
        console.log(cargo)
        if (cargo != undefined){
            return repository.permissoesCargo.getByCargo(cargo)
        }
    }

    const cliente = await repository.cliente.getByUsuario(usuario)
    console.log("cliente", cliente)
    if (cliente !== undefined){
        return ['Cliente']
    }
    
}

async function getUser(req: Request, res: Response) {
    const usuario = req.user as Usuario;

    if (!usuario) {
        return res.status(400).json({ error: 'Usuário não autenticado' });
    }

    try {
        const permissoes = await getPermissoes(usuario);
        return res.status(200).json({ usuario, permissoes });
    } catch (e) {
        console.error('Erro ao obter informações do usuário:', e);
        return res.status(500).json({ error: 'Erro interno ao buscar informações do usuário' })
    }
}

export default {login, getPermissoes, getUser}