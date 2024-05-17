import { Request, Response, Router } from "express";

const RelatoriosRouter = Router();

/**
 *  @swagger
 *  /relatorios:
 *  get:
 *    tags: [Relatorios]
 * 
 *  post:
 *    tags: [Relatorios]
 */


RelatoriosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Relatórios')
})

export default RelatoriosRouter;