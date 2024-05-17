import { Request, Response, Router } from "express";

const ClientesRouter = Router();

/**
 *  @swagger
 *  /clientes:
 *  get:
 *    tags: [Clientes]
 * 
 *  post:
 *    tags: [Clientes]
 * 
 *  put:
 *    tags: [Clientes]
 * 
 *  delete:
 *    tags: [Clientes]
 * 
 */


ClientesRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Clientes')
})

export default ClientesRouter;