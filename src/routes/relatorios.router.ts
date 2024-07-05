import { Request, Response, Router } from "express";
import authorization from "../middleware/authorizationMiddleware";
import safeBodyParser from "../middleware/safeBodyParser";
import { DataInicialFinalSchema } from "../utils/QueryParamsSchemas";
import controller from "../controllers/relatorio.controller";


const RelatoriosRouter = Router();

/**
 * @swagger
 * /relatorios/resumo-vendas-periodo:
 *   post:
 *     summary: Gera relatório de vendas por período
 *     tags: [Relatorios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DataInicialFinal'
 *     responses:
 *       201:
 *         description: Relatório gerado
 *       '401':
 *         description: Não foi possível gerar o relatório
 */
RelatoriosRouter.post('/resumo-vendas-periodo',
    authorization("Administrador"),
    safeBodyParser(DataInicialFinalSchema),
    controller.ResumoVendasPeriodo
)

/**
 * @swagger
 * /relatorios/resumo-vendas-produto:
 *   post:
 *     summary: Gera relatório de produtos vendidos em determinado período
 *     tags: [Relatorios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DataInicialFinal'
 *     responses:
 *       201:
 *         description: Relatório gerado
 *       '401':
 *         description: Não foi possível gerar o relatório
 */
RelatoriosRouter.post('/resumo-vendas-produto',
    authorization("Administrador"),
    safeBodyParser(DataInicialFinalSchema),
    controller.ResumoVendasPorProduto
)

/**
 * @swagger
 * /relatorios/resumo-vendas-cliente:
 *   post:
 *     summary: Gera relatório de vendas por cliente em determinado período
 *     tags: [Relatorios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DataInicialFinal'
 *     responses:
 *       201:
 *         description: Relatório gerado
 *       '401':
 *         description: Não foi possível gerar o relatório
 */
RelatoriosRouter.post('/resumo-vendas-cliente',
    authorization("Administrador"),
    safeBodyParser(DataInicialFinalSchema),
    controller.ResumoVendasPorCliente
)

export default RelatoriosRouter;