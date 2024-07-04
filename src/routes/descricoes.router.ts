import { Request, Response, Router } from "express";
import multer from "multer";
import generateTempFileName from "../utils/generateTempFileName";
import path from 'path'
import controller from "../controllers/descricoes.controller";
const DescricoesRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/temp/');
    },
    filename: (req, file, cb) => {
        const timestamp = generateTempFileName();
        const extension = path.extname(file.originalname);
        console.log(extension)
        cb(null, `${timestamp}${extension}`);
    }
});

const upload = multer({ storage });

/**
 * @swagger
 * /descricoes/sobre:
 *   get:
 *     summary: Obter sobre.html
 *     tags: [Descrições]
 *     responses:
 *       200:
 *         description: HTML recebido com sucesso.
 *         content:
 *             text/html:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao obter HTML.
 */
DescricoesRouter.get('/sobre',
    controller.getSobre
)

/**
 * @swagger
 * /descricoes/contato:
 *   get:
 *     summary: Obter contato.html
 *     tags: [Descrições]
 *     responses:
 *       200:
 *         description: HTML recebido com sucesso.
 *         content:
 *             text/html:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao obter HTML.
 */
DescricoesRouter.get('/contato',
    controller.getContato
)

/**
 * @swagger
 * /descricoes/sobre:
 *   put:
 *     summary: Enviar sobre.html
 *     tags: [Descrições]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: O arquivo HTML para enviar
 *     responses:
 *       200:
 *         description: HTML enviado com sucesso.
 *       500:
 *         description: Erro ao enviar HTML.
 */
DescricoesRouter.put('/sobre',
    upload.single('file'),
    controller.setSobre
)

/**
 * @swagger
 * /descricoes/contato:
 *   put:
 *     summary: Enviar contato.html
 *     tags: [Descrições]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: O arquivo HTML para enviar
 *     responses:
 *       200:
 *         description: HTML enviado com sucesso.
 *       500:
 */
DescricoesRouter.put('/contato',
    upload.single('file'),
    controller.setContato
)

export default DescricoesRouter;