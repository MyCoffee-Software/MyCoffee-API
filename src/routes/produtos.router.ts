import { NextFunction, Request, Response, Router } from "express";
import controller from "../controllers/produto.controller";
import authorization from "../middleware/authorizationMiddleware";
import { Permissao } from "../models/permissao";
import queryParamConversion from "../middleware/queryParamConversion";
import safeQueryParser from "../middleware/safeQueryParser";
import { produtoGetQuerySchema } from "../utils/QueryParamsSchemas";
import safeBodyParser from "../middleware/safeBodyParser";
import { ProdutoSchema } from "../models/produto";

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
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       '401':
 *         description: Não autorizado
 */
ProdutosRouter.post('/',
    authorization('Gerenciar Produto'),
    safeBodyParser(ProdutoSchema), 
    controller.create)

/**
 * @swagger
 * /produtos:
 *   put:
 *     summary: Altera um produto
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do produto a ser alterado
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 */
ProdutosRouter.put('/', 
    authorization('Administrador'),
    queryParamConversion({id: 'int'}),
    safeQueryParser(produtoGetQuerySchema), 
    safeBodyParser(ProdutoSchema), 
    controller.update)

/**
 * @swagger
 * /produtos:
 *   delete:
 *     summary: SoftDelete de um produto
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do produto a ser retornado
 *         required: true
 *     responses:
 *       201:
 *         description: Produto (soft)deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 */
ProdutosRouter.delete('/',
    authorization('Administrador'),
    queryParamConversion({id: 'int'}),
    safeQueryParser(produtoGetQuerySchema),
    controller.Delete
)

export default ProdutosRouter;