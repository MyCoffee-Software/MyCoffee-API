import { Request, Response, Router } from "express";

const CargosRouter = Router();

/**
 *  @swagger
 *  /cargos:
 *  get:
 *    tags: [Cargos]
 * 
 *  post:
 *    tags: [Cargos]
 * 
 *  put:
 *    tags: [Cargos]
 * 
 *  delete:
 *    tags: [Cargos]
 * 
 */

CargosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Cargos')
})

export default CargosRouter;