import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import safeBodyParser from "../middleware/safeBodyParser";
import { CompraSchema } from "../models/compra";
import controller from "../controllers/compra.controller";

const ComprasRouter = Router();

/**
 *  @swagger
 *  /compras:
 *  get:
 *    tags: [Compras]
 */


ComprasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Compras')
})


/**
 * @swagger
 * /compras:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compra'
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       '401':
 *         description: Não autorizado
 */
ComprasRouter.post('/',
    authorization("Cliente"),
    safeBodyParser(CompraSchema),
    controller.create
)

export default ComprasRouter;