import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import controller from "../controllers/cargo.controller"
import queryParamConversion from "../middleware/queryParamConversion";

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
CargosRouter.get('/', queryParamConversion({id: "bigint", pagina: "int", limite: "int"}) ,authorization('Funcionario'), controller.get)

CargosRouter.post('/', authorization('Administrador'), controller.create)

export default CargosRouter;