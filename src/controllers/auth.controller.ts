import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import repository from "../repository/repository";
import { Usuario } from "../models/usuario";
import { Permissao } from "../models/permissao";

async function login(req: Request, res: Response) {
    const JWT_SECRET = process.env.JWT_SECRET
    const {email, senha} = req.body
    const usuario = await repository.usuario.getByEmail(email)


    if (!usuario) {
        res.status(400).json({
            error: 'Usuário inválido'
        })
    } else {
        const match = await bycript.compare(senha, usuario.senha)

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
            {expiresIn: '10m'}
        )

        return res.status(200).json({ token })
    }
}

async function getPermissoes(usuario: Usuario): Promise<Permissao[]> {
    if (usuario === undefined){
        return []
    }

    const admin = await repository.admin.getByUsuario(usuario)
    console.log("admin", admin)
    if (admin !== undefined){
        return ['Administrador']
    }
        
    const funcionario = await repository.funcionario.getByUsuario(usuario) 
    console.log("funcionario", funcionario)
    if (funcionario !== undefined){
        return (await repository.cargo.getByFuncionario(funcionario)).permissoes
    }

    const cliente = await repository.cliente.getByUsuario(usuario)
    console.log("cliente", cliente)
    if (cliente !== undefined){
        return ['Cliente Logado']
    }
    
}

async function getUser(req: Request, res: Response) {
    const usuario = req.user as Usuario;

    if (!usuario) {
        return res.status(400).json({ error: 'Usuário não autenticado' });
    }

    return res.status(200).json({ usuario });
}

export default {login, getPermissoes, getUser}