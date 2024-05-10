import { Request, Response} from "express";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'

const user = 'lohan'
const word = 'senha123'
const hash = bycript.hash(word, 10)

export async function autenticar(req: Request, res: Response){
    console.log(req.body)
    const {username, password} = req.body

    if (username !== user) {
        res.status(400).json({
            error: 'Usuário inválido'
        })
    }

    const match = await bycript.compare(password, await hash)

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