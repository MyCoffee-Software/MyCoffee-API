import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usuarios } from "../mockupData/mockupData";

export async function autenticar(req: Request, res: Response){
    const {username: email, password} = req.body

    const usuario = usuarios.find((u) => u.email == email)

    if (usuario === undefined) {
        res.status(400).json({
            error: 'Usuário inválido'
        })
    } else {

    const match = await bycript.compare(password, usuario.senha)

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

export async function autorizar(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ msg: 'Não há token, autorização negada'})
    }

    try {
        const tokenDecodificado = jwt.verify(token, 'chave123')
        console.log(tokenDecodificado)
        next()
    } catch (err) {
        res.status(401).json({msg: 'Token inválido'})
    }
}