import { Router, Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import authorizationMiddleware from "../middleware/authorizationMiddleware";

const SobreRouter = Router();
const filePath = path.join(__dirname, process.env.DESCRICOES_PATH);

SobreRouter.get('/', (req: Request, res: Response) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).send('Error ao ler arquivo sobre');
            return;
        }
        res.send(data);
    })
})

SobreRouter.post('/', authorizationMiddleware("Administrador"), (req: Request, res: Response) => {
    const { content } = req.body;
    if (typeof content !== 'string') {
        res.status(400).send('Conteúdo inválido');
        return;
    }
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            res.status(500).send('Erro ao escrever arquivo');
            return;
        }
        res.status(200).send('Conteúdo salvo');
    });
})


export default SobreRouter;