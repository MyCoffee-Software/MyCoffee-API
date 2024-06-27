import { Request, Response, Router } from "express";
import PlanosRouter from "./planos.router";
import queryParamConversion from "../middleware/queryParamConversion";
import controller from "../controllers/plano.controller";
import ProdutosRouter from "./produtos.router";


const RelatoriosRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Relatorios
 *   description: API para gerenciar os relatórios
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista produtos
 *     description: Retorna os produtos, de acordo com a parametrização
 *     tags: [Relatorios]
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Id do produto desejado
 *       required: false
 *       schema:
 *         type: number
 *     - in: path
 *       name: categoria
 *       description: Id da categoria desejada como filtro
 *       required: false
 *       schema:
 *         type: number
 *     - in: path
 *       name: text
 *       description: Texto relacionado desejado como filtro
 *       required: false
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna uma lista de clientes
 */

ProdutosRouter.get('/', queryParamConversion({ id: "int", pagina: "int", limite: "int"}), controller.get);

/**
 * @swagger
 * /planos:
 *   get:
 *     summary: Obtém um ou todos os planos
 *     tags: [Relatorios]
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

export default RelatoriosRouter;