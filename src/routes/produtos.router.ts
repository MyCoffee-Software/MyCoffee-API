import { NextFunction, Request, Response, Router } from "express";
import controller from "../controllers/produto.controller";
import authorization from "../middleware/authorizationMiddleware";
import { Permissao } from "../models/permissao";
import queryParamConversion from "../middleware/queryParamConversion";
import safeQueryParser from "../middleware/safeQueryParser";
import { produtoGetQuerySchema } from "../utils/QueryParamsSchemas";

const ProdutosRouter = Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Obtém um ou uma lista de produto
 *     tags: [Produtos]
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
 *         description: O id do produto a ser retornado
 *         required: false
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: integer
 *         description: O id da categoria dos produtos a serem retornado
 *         required: false
 *       - in: query
 *         name: texto
 *         schema:
 *           type: string
 *         description: O texto relativo aos produtos a serem retornado
 *         required: false
 * 
 *     responses:
 *       '200':
 *         description: Produto(s) encontrado(s)
 *       '401':
 *         description: Não autorizado
 */
ProdutosRouter.get('/', 
    queryParamConversion({id: 'int', pagina: 'int', limite: "int", categoria: 'int', texto: "string"}),
    safeQueryParser(produtoGetQuerySchema),
    (req: Request, res: Response,  next: NextFunction) => {
        console.log("->", req.query, req.newQuery, req.user)
        next();
    },
    controller.get)

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *     responses:
 *       '200':
 *         description: Produto criado com sucesso
 *       '401':
 *         description: Não autorizado
 */
ProdutosRouter.post('/', authorization('Administrador'), (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Produtos (POST)')
})

/**
 * @swagger
 * /produtos:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Id do produto a ser alterado
 *       required: true
 *       schema:
 *         type: number
 *     requestBody:
 *       required: true
 *       application/json:
 *         schema:
 *           type: object
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *       '401':
 *         description: Não autorizado
 *          
 */

/**
 * @swagger
 * /produtos:
 *   delete:
 *     summary: Deleta um produto existente
 *     tags: [Produtos]
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Id do produto a ser deletado
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       '200':
 *         description: Produto deletado com sucesso
 *       '401':
 *         description: Não autorizado
 *          
 */

export default ProdutosRouter;