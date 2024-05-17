import { Request, Response, Router } from "express";

const PlanosRouter = Router();

/**
 *  @swagger
 *  /planos:
 *  get:
 *    tags: [Planos]
 * 
 *  post:
 *    tags: [Planos]
 * 
 *  put:
 *    tags: [Planos]
 * 
 *  delete:
 *    tags: [Planos]
 * 
 */

PlanosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Planos')
})

export default PlanosRouter;