import { Request, Response, Router } from "express";
import queryParamConversion from "../middleware/queryParamConversion";
import { number } from "zod";
import safeQueryParser from "../middleware/safeQueryParser";
import { idOuPaginacaoSchema, idSchema } from "../utils/QueryParamsSchemas";
import controller from "../controllers/funcionario.controller";
import authorization from "../middleware/authorizationMiddleware";
import safeBodyParser from "../middleware/safeBodyParser";
import { funcionarioSchema } from "../models/funcionario";

const FuncionariosRouter = Router();

/**
 *  @swagger
 *  /funcionarios: 
 *  post:
 *    tags: [Funcionarios]
 * 
 *  put:
 *    tags: [Funcionarios]
 * 
 *  delete:
 *    tags: [Funcionarios]
 * 
 */

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Obtém um ou todos os funcionários
 *     tags: [Funcionarios]
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
 *         description: O id do funcionario a ser retornado
 *         required: false
 * 
 *     responses:
 *       '200':
 *         description: Funcionario(s) encontrado(s)
 *       '401':
 *         description: Não autorizado
 */
FuncionariosRouter.get('/',
    authorization("Administrador"),
    queryParamConversion({id: "int", pagina: "int", limite: "int"}),
    safeQueryParser(idOuPaginacaoSchema),
    controller.get
)

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionario
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionario criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       400:
 *         description: Dados inválidos
 */
FuncionariosRouter.post('/',
    authorization("Administrador"),
    safeBodyParser(funcionarioSchema),
    controller.create
)

/**
 * @swagger
 * /funcionarios:
 *   put:
 *     summary: Altera um funcionario
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do funcionario a ser retornado
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionario alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       400:
 *         description: Dados inválidos
 */
FuncionariosRouter.put('/',
    authorization("Administrador"),
    queryParamConversion({id: "int"}),
    safeQueryParser(idSchema),
    safeBodyParser(funcionarioSchema),
    controller.update
)

/**
 * @swagger
 * /funcionarios:
 *   delete:
 *     summary: SoftDelete de um funcionario
 *     tags: [Funcionario]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do funcionario a ser retornado
 *         required: true
 *     responses:
 *       201:
 *         description: Funcionario (soft)deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       400:
 *         description: Dados inválidos
 */
FuncionariosRouter.delete('/',
    authorization("Administrador"),
    queryParamConversion({id: "int"}),
    safeQueryParser(idSchema),
    controller.Delete
)

export default FuncionariosRouter;