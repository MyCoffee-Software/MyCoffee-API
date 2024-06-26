import { Request, Response, Router } from "express";
import  categoriaRepository from "../repository/categoria.repositoy"
import { Categoria, CategoriaSchema } from "../models/categoria";
import queryParamConversion from "../middleware/queryParamConversion";
import controller from "../controllers/categoria.controller";
import safeBodyParser from "../middleware/safeBodyParser";
import safeQueryParser from "../middleware/safeQueryParser";
import { idSchema } from "../utils/QueryParamsSchemas";
import { CargoSchema } from "../models/cargo";

const CategoriasRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: API para gerenciar categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtém uma ou todas as categorias
 *     tags: [Categorias]
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
 *         description: O id da categoria a ser retornada
 *         required: false
 * 
 *     responses:
 *       '200':
 *         description: Categoria retornado com sucesso
 *       '401':
 *         description: Não autorizado
 */
CategoriasRouter.get('/', queryParamConversion({ id: "int", pagina: "int", limite: "int"}), controller.get);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
CategoriasRouter.post('/', safeBodyParser(CategoriaSchema), controller.create);

/**
 * @swagger
 * /categorias:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categorias]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria atualizado com sucesso
 *       404:
 *         description: Categoria não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
CategoriasRouter.put('/',
    queryParamConversion({ id: 'int' }), 
    safeQueryParser(idSchema), 
    safeBodyParser(CargoSchema.partial()), 
    controller.update);

/**
 * @swagger
 * /categorias:
 *   delete:
 *     summary: SoftDelete de ums categoria
 *     tags: [Categorias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id da categoria a ser retornado
 *         required: true
 *     responses:
 *       201:
 *         description: Categoria (soft)deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos
 */
CategoriasRouter.delete('/',
    queryParamConversion({id: 'int'}),
    safeQueryParser(idSchema),
    controller.Delete
)

export default CategoriasRouter;