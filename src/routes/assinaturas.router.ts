import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import { AssinaturaSchema } from "../models/assinatura";
import safeBodyParser from "../middleware/safeBodyParser";
import controller from "../controllers/assinatura.controller";
import { PeriodoSchema } from "../models/periodo";
import safeQueryParser from "../middleware/safeQueryParser";
import { idOuPaginacaoSchema, idSchema } from "../utils/QueryParamsSchemas";
import queryParamConversion from "../middleware/queryParamConversion";

const AssinaturasRouter = Router();

/**
 * @swagger
 * /assinaturas:
 *   get:
 *     summary: Lista a assinatura vigente do cliente logado
 *     tags: [Assinaturas]
 *     responses:
 *       '200':
 *         description: Assinatura encontrada
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.get('/',
    authorization("Cliente"),
    controller.getSelf
)

/**
 * @swagger
 * /assinaturas/gerente:
 *   get:
 *     summary: Lista uma ou mais assinaturas
 *     tags: [Assinaturas]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: A quantidade de itens a ser retornada
 *         required: false
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: A página de itens a ser retornada
 *         required: false
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id da assinatura a ser retornado
 *         required: false 
 *     responses:
 *       '200':
 *         description: Assinatura(s) encontrada(s)
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.get('/gerente/',
    authorization("Gerenciar Assinatura"),
    queryParamConversion({id: 'int', pagina: 'int', limite: 'int'}),
    safeQueryParser(idOuPaginacaoSchema),
    controller.get
)

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
 * /assinaturas/estender:
 *   post:
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
AssinaturasRouter.post('/estender/',
    authorization("Cliente"),
    safeBodyParser(PeriodoSchema),
    controller.estender
)

/**
 * @swagger
 * /assinaturas:
 *   delete:
 *     summary: Cancela uma assinatura
 *     tags: [Assinaturas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Assinatura cancelada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assinatura'
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.delete('/',
    authorization("Cliente"),
    controller.cancelar
)


/**
 * @swagger
 * /assinaturas/gerente:
 *   put:
 *     summary: Altera uma assinatura
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
 *         description: Assinatura alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assinatura'
 *       '401':
 *         description: Não autorizado
 */
AssinaturasRouter.put('/gerente/',
    authorization("Gerenciar Assinatura"),
    safeBodyParser(AssinaturaSchema),
    controller.update
)



export default AssinaturasRouter;