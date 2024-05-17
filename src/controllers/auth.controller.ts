import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usuarios } from "../mockupData/mockupData";

export async function login(req: Request, res: Response) {
    console.log('login aqui ')
    const {email, senha} = req.body
    const usuario = usuarios.find((u) => u.email == email)

    if (usuario === undefined) {
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
            id: 1,
            nome: 'Lohan'
        }
    }

    jwt.sign(
        payload,
        'chave123',
        {expiresIn: '1m'},
        (err, token) => {
            if (err) throw err
            res.json({token})
        }
    )
  }
}