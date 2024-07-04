import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import multer from "multer";
import controller from "../controllers/imagens.controller";
import generateTempFileName from "../utils/generateTempFileName";
import path from 'path'
import safeBodyParser from "../middleware/safeBodyParser";
import { ImagemSchema } from "../models/imagem";

const ImagensRouter = Router();

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
 * /imagens/produtos/{nome}:
 *   post:
 *     summary: Adicionar imagem a um produto
 *     tags: [Imagens]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da imagem (com extensão)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem adicionada ao produto com sucesso.
 *       500:
 *         description: Erro ao adicionar a imagem ao produto.
 */
ImagensRouter.post('/produtos/:nome', 
    authorization("Gerenciar Produto"),
    upload.single("imagem"),
    controller.addToProduto
)

/**
 * @swagger
 * /imagens/planos/{nome}:
 *   post:
 *     summary: Adicionar imagem a um plano
 *     tags: [Imagens]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da imagem (com extensão)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem adicionada ao plano com sucesso.
 *       500:
 *         description: Erro ao adicionar a imagem ao plano.
 */
ImagensRouter.post('/planos/:nome', 
    authorization("Gerenciar Assinatura"),
    upload.single("imagem"),
    controller.addToPlano
)

/**
 * @swagger
 * /imagens/usuarios/{nome}:
 *   post:
 *     summary: Adicionar imagem a um usuário
 *     tags: [Imagens]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da imagem (com extensão)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem adicionada ao usuário com sucesso.
 *       500:
 *         description: Erro ao adicionar a imagem ao usuário.
 */
ImagensRouter.post('/usuarios/:nome',
    upload.single("imagem"),
    controller.addToUsuario
)

/**
 * @swagger
 * /imagens/{diretorio}/{nome}:
 *   get:
 *     summary: Obter imagem pública
 *     tags: [Imagens]
 *     parameters:
 *       - in: path
 *         name: diretorio
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do diretório
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo (com extensão)
 *     responses:
 *       200:
 *         description: Imagem obtida com sucesso.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada.
 *       500:
 *         description: Erro ao obter a imagem.
 */
ImagensRouter.get('/:diretorio/:nome',
    controller.get
)

export default ImagensRouter;