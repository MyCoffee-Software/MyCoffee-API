import { Request, Response, Router } from "express";

const ComprasRouter = Router();

/**
 *  @swagger
 *  /compras:
 *  get:
 *    tags: [Compras]
 * 
 *  post:
 *    tags: [Compras]
 */


ComprasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Compras')
})

export default ComprasRouter;