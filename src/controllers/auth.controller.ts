import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import repository from "../repository/repository";

export async function login(req: Request, res: Response) {
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
                nome: usuario.nomeCompleto
            }
        }

        jwt.sign(
            payload,
            JWT_SECRET as string,
            {expiresIn: '10m'},
            (err, token) => {
                if (err) throw err
                res.json({token})
            }
        )
    }
}