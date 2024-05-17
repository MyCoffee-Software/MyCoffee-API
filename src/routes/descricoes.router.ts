import { Request, Response, Router } from "express";

const DescricoesRouter = Router();

/**
 *  @swagger
 *  /descricoes:
 *  get:
 *    tags: [Descrições]
 */

/**
 *  @swagger 
 *  /descricoes/sobre-nos:
 *  get:
 *    tags: [Descrições]
 * 
 *  put:
 *    tags: [Descrições]
 */

/**
 *  @swagger
 *  /descricoes/contato:
 *  get:
 *    tags: [Descrições]
 *  
 *  put:
 *    tags: [Descrições]
 * 
 */

DescricoesRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Descrições')
})

export default DescricoesRouter;