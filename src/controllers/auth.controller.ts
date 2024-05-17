import { NextFunction, Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from "../db";

export async function login(req: Request, res: Response) {
    const JWT_SECRET = process.env.JWT_SECRET
    console.log('controladora', JWT_SECRET)

    const {email, senha} = req.body
    const usuario = await prisma.usuario.findUnique({where: {email}})


    if (!usuario) {
        res.status(400).json({
            error: 'Usuário inválido'
        })
    } else {
        
        console.log(await bycript.hash(usuario?.senha, 10))
        const match = await bycript.compare(senha, usuario.senha)

        if (!match){
            res.status(400).json({
                error: 'Senha inválida'
            })
        }

        const payload = {
            user: {
                id: Number(usuario.id),
                nome: usuario.nome_completo
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