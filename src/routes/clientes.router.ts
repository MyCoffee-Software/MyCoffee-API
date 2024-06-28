import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import queryParamConversion from "../middleware/queryParamConversion";
import safeQueryParser from "../middleware/safeQueryParser";
import { idOuPaginacaoSchema, idSchema } from "../utils/QueryParamsSchemas";
import controller from "../controllers/cliente.controller";
import safeBodyParser from "../middleware/safeBodyParser";
import { clienteSchema } from "../models/cliente";

const ClientesRouter = Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtém um ou todos os clientes
 *     tags: [Clientes]
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
 *         description: O id do cliente a ser retornado
 *         required: false
 * 
 *     responses:
 *       '200':
 *         description: Cliente(s) encontrado(s)
 *       '401':
 *         description: Não autorizado
 */
ClientesRouter.get('/',
    authorization("Cliente"),
    queryParamConversion({id: "int", pagina: "int", limite: "int"}),
    safeQueryParser(idOuPaginacaoSchema),
    controller.get
)

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 */
ClientesRouter.post('/',
    safeBodyParser(clienteSchema),
    controller.create
)

/**
 * @swagger
 * /clientes:
 *   put:
 *     summary: Altera um cliente
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do cliente a ser retornado
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 */
ClientesRouter.put('/',
    authorization("Cliente"),
    queryParamConversion({id: "int"}),
    safeQueryParser(idSchema),
    safeBodyParser(clienteSchema),
    controller.update
)

/**
 * @swagger
 * /clientes:
 *   delete:
 *     summary: SoftDelete de um cliente
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: O id do cliente a ser retornado
 *         required: true
 *     responses:
 *       201:
 *         description: Cliente (soft)deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 */
ClientesRouter.delete('/',
    authorization("Administrador"),
    queryParamConversion({id: "int"}),
    safeQueryParser(idSchema),
    controller.Delete
)


export default ClientesRouter;