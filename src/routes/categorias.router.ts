import { Request, Response, Router } from "express";

const CategoriasRouter = Router();

/**
 *  @swagger
 *  /categorias:
 *  get:
 *    tags: [Categorias]
 * 
 *  post:
 *    tags: [Categorias]
 * 
 *  put:
 *    tags: [Categorias]
 * 
 *  delete:
 *    tags: [Categorias]
 * 
 */

CategoriasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Categorias')
})

export default CategoriasRouter;