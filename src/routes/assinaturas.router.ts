import { Request, Response, Router } from "express";

const AssinaturasRouter = Router();

/**
 *  @swagger
 *  /assinaturas:
 *  post:
 *    tags: [Assinaturas]
 * 
 *  put:
 *    tags: [Assinaturas]
 * 
 *  delete:
 *    tags: [Assinaturas]
 * 
 */


AssinaturasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Assinaturas')
})

export default AssinaturasRouter;