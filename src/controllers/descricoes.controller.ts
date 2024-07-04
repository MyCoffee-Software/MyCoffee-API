import { Request, Response } from "express";
import fs from 'fs'
import path from 'path'
import cleanTempFolder from "../utils/cleanTempFolder";

async function getSobre(req: Request, res: Response) {
    const target = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.SOBRE_PATH,
        process.env.SOBRE_FILE_NAME
    )

    console.log(target)
    
    let erro = undefined
    fs.access(target, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            erro = true
        }
        console.log('aqui')

    });

    if (erro === true) {
        return res.status(404).send('Htlm não encontrado.');
    }

    // Envia o arquivo como resposta
    return res.status(200).sendFile(target, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(500).send('Erro ao obter o HTML.');
        }
    });
}

async function setSobre(req: Request, res: Response) {
    const nome = process.env.SOBRE_FILE_NAME

    const diretorio = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.SOBRE_PATH
    )           
    
    const target = path.join(diretorio, nome)

    fs.rename(req.file.path, target, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao salvar HTML' })
        }

        cleanTempFolder()
        return res.status(200).send('HTML salvo com sucesso!')
    })

    return 
}

async function getContato(req: Request, res: Response) {
    const target = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.CONTATO_PATH,
        process.env.CONTATO_FILE_NAME
    )
    
    let erro = undefined
    fs.access(target, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            erro = true
        }
        
    });
    if (erro === true) {
        return res.status(404).send('Htlm não encontrado.');
    }
 
    return res.status(200).sendFile(target, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            return res.status(500).send('Erro ao obter o HTML.');
        }
    });
}

async function setContato(req: Request, res: Response) {
    const nome = process.env.CONTATO_FILE_NAME

    const diretorio = path.join(
        __dirname,
        process.env.UPLOADS_PATH,
        process.env.CONTATO_PATH
    )           
    
    const target = path.join(diretorio, nome)

    fs.rename(req.file.path, target, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao salvar HTML' })
        }

        cleanTempFolder()
        return res.status(200).send('HTML salvo com sucesso!')
    })

    return
    
}

export default {getSobre, setSobre, getContato, setContato}

