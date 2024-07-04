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

ImagensRouter.post('/produtos/:nome', 
    authorization("Gerenciar Produto"),
    upload.single("imagem"),
    controller.addToProduto
)

ImagensRouter.post('/planos/:nome', 
    authorization("Gerenciar Assinatura"),
    upload.single("imagem"),
    controller.addToPlano
)

ImagensRouter.post('/usuarios/:nome',
    upload.single("imagem"),
    controller.addToUsuario
)

ImagensRouter.get('/:diretorio/:nome',
    controller.get
)

export default ImagensRouter;