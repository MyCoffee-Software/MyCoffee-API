import { Request, Response, Router } from "express";

const PedidosRouter = Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     description: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Retorna uma lista de clientes
 */
PedidosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Produtos')
})

export default PedidosRouter;