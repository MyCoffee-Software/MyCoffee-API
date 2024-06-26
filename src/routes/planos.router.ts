import { Request, Response, Router } from "express";
import controller from "../controllers/plano.controller";
import queryParamConversion from "../middleware/queryParamConversion";
import authorization from "../middleware/authorizationMiddleware";
import safeBodyParser from "../middleware/safeBodyParser";
import { PlanoSchema } from "../models/plano";
import safeQueryParser from "../middleware/safeQueryParser";
import { idSchema } from "../utils/QueryParamsSchemas";

const PlanosRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: API para gerenciar planos de assinatura
 */

/**
 * @swagger
 * /planos:
 *   get:
 *     summary: Obtém um ou todos os planos
 *     tags: [Planos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           description: A quantidade de itens a ser retornada
 *           required: false
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           description: A página de itens a ser retornada
 *           required: false
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *           description: O id do plano a ser retornada
 *           required: false
 * 
 *     responses:
 *       '200':
 *         description: Plano(s) retornado com sucesso
 *       '401':
 *         description: Não autorizado
 */
PlanosRouter.get('/', queryParamConversion({ id: "int", pagina: "int", limite: "int"}), controller.get);

/**
 * @swagger
 * /planos:
 *   post:
 *     summary: Cria um novo plano
 *     tags: [Planos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       400:
 *         description: Dados inválidos
 */
PlanosRouter.post('/',
    /*authorization('Administrador'),*/ 
    safeBodyParser(PlanoSchema), 
    controller.create)

/**
 * @swagger
 * /planos:
 *   put:
 *     summary: Altera um plano
 *     tags: [Planos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do plano a ser alterado
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       201:
 *         description: Plano alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       400:
 *         description: Dados inválidos
 */
PlanosRouter.put('/', 
    /*authorization('Administrador'),*/
    queryParamConversion({id: 'int'}),
    safeQueryParser(idSchema), 
    safeBodyParser(PlanoSchema.partial()), 
    controller.update)

/**
 * @swagger
 * /planos:
 *   delete:
 *     summary: SoftDelete de um plano
 *     tags: [Planos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do plano a ser retornado
 *         required: true
 *     responses:
 *       201:
 *         description: Plano (soft)deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       400:
 *         description: Dados inválidos
 */
PlanosRouter.delete('/',
    queryParamConversion({id: 'int'}),
    safeQueryParser(idSchema),
    controller.Delete
)

export default PlanosRouter;
