import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import { AssinaturaSchema } from "../models/assinatura";
import safeBodyParser from "../middleware/safeBodyParser";
import controller from "../controllers/assinatura.controller";
import { PeriodoSchema } from "../models/periodo";

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

/**
 * @swagger
 * /assinaturas:
 *   post:
 *     summary: Cria uma nova assinatura
 *     tags: [Assinaturas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assinatura'
 *     responses:
 *       201:
 *         description: Assinatura criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assinatura'
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.post('/',
    authorization("Cliente"),
    safeBodyParser(AssinaturaSchema),
    controller.create
)

/**
 * @swagger
 * /assinaturas:
 *   put:
 *     summary: Estende uma assinatura
 *     tags: [Assinaturas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Periodo'
 *     responses:
 *       201:
 *         description: Assinatura estendida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assinatura'
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.put('/',
    authorization("Cliente"),
    safeBodyParser(PeriodoSchema),
    controller.estender
)

export default AssinaturasRouter;