import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import controller from "../controllers/cargo.controller"
import queryParamConversion from "../middleware/queryParamConversion";
import safeQueryParser from "../middleware/safeQueryParser";
import safeBodyParser from "../middleware/safeBodyParser";
import { idSchema } from "../utils/QueryParamsSchemas";
import { CargoSchema } from "../models/cargo";

const CargosRouter = Router();

/**
 * @swagger
 * /cargos:
 *   get:
 *     summary: Obtém um ou todos os cargos
 *     tags: [Cargos]
 *     security:
 *       - BearerAuth: []
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
 *         description: O id do cargo a ser retornado
 *         required: false
 * 
 *     responses:
 *       '200':
 *         description: Produto criado com sucesso
 *       '401':
 *         description: Não autorizado
 */
CargosRouter.get('/', queryParamConversion({id: "int", pagina: "int", limite: "int"}) ,authorization('Funcionario'), controller.get)


/**
 * @swagger
 * /cargos:
 *   post:
 *     summary: Cria um novo cargo
 *     tags: [Cargos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cargo'
 *     responses:
 *       201:
 *         description: Cargo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cargo'
 *       400:
 *         description: Dados inválidos
 */
CargosRouter.post('/', 
    authorization('Administrador'), 
    safeBodyParser(CargoSchema),
    controller.create)

CargosRouter.put('/', 
    authorization('Administrador'),
    queryParamConversion({id: 'int'}),
    safeQueryParser(idSchema), 
    safeBodyParser(CargoSchema.partial()), 
    controller.update)

export default CargosRouter;