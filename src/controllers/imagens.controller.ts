import { Request, Response } from "express";
import path from 'path'
import fs from 'fs'
import cleanTempFolder from "../utils/cleanTempFolder";

async function addToProduto(req: Request, res: Response) {
    const nome = req.params.nome

    const diretorio = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.IMAGENS_PRODUTO_PATH
    )           
    
    const target = path.join(diretorio, nome)

    fs.rename(req.file.path, target, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao salvar imagem' })
        }
        
        cleanTempFolder()
        return res.status(200).json({ URL: `produtos/${nome}` })
    })
    return
}

async function addToPlano(req: Request, res: Response) {
    const nome = req.params.nome

    const diretorio = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.IMAGENS_PLANO_PATH
    )           
    
    const target = path.join(diretorio, nome)

    fs.rename(req.file.path, target, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao salvar imagem' })
        }
        
        cleanTempFolder()
        return res.status(200).json({ URL: `planos/${nome}` })
    })
    return
}

async function addToUsuario(req: Request, res: Response) {
    const nome = req.params.nome

    const diretorio = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.IMAGEM_USUARIO_PATH
    )           
    
    const target = path.join(diretorio, nome)

    fs.rename(req.file.path, target, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao salvar imagem' })
        }
        
        cleanTempFolder()
        return res.status(200).json({ URL: `usuarios/${nome}` })
    })
    return

}

async function get(req: Request, res: Response) {
    const {nome, diretorio} = req.params

    const target = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        "/imagens",
        "/" + diretorio,
        "/" + nome
    )
    
    fs.access(target, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            // Arquivo não encontrado
            return res.status(404).send('Imagem não encontrada.');
        }

        // Envia o arquivo como resposta
        res.sendFile(target, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao obter a imagem.');
            }
        });

        
    });
    return 
}

export default { addToPlano, addToProduto, addToUsuario, get }