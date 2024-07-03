import { Request, Response, Router } from "express";
import authorization from '../middleware/authorizationMiddleware';
import safeBodyParser from '../middleware/safeBodyParser';
import { itemCarrinhoSchema } from '../models/itemCarrinho';
import controller from '../controllers/carrinho.controller';
import { PlanoCarrinhoSchema } from '../models/planoCarrinho';

const CarrinhoRouter = Router();

/**
 * @swagger
 * /carrinho:
 *   get:
 *     summary: Obtém detalhes do carrinho do usuário logado
 *     tags: [Carrinho] 
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalhes do carrinho
 *       '401':
 *         description: Não autorizado
 */
CarrinhoRouter.get('/', 
    authorization('Cliente'),
    controller.get
)

/**
 * @swagger
 * /carrinho/produtos:
 *   post:
 *     summary: Adiciona uma quantidade de um produto no carrinho
 *     tags: [Carrinho]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCarrinho'
 *     responses:
 *       201:
 *         description: Quantidade acrescida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCarrinho'
 *       400:
 *         description: Dados inválidos
 */
CarrinhoRouter.post('/produtos/',
    authorization('Cliente'),
    safeBodyParser(itemCarrinhoSchema),
    controller.adicionarProduto
)


/**
 * @swagger
 * /carrinho/plano:
 *   post:
 *     summary: Adiciona um plano no carrinho
 *     tags: [Carrinho]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanoCarrinho'
 *     responses:
 *       201:
 *         description: Plano acrescido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanoCarrinho'
 *       409:
 *         description: Plano ja existente
 */
CarrinhoRouter.post('/plano/',
    authorization('Cliente'),
    safeBodyParser(PlanoCarrinhoSchema),
    controller.adicionarPlano
)

/**
 * @swagger
 * /carrinho/plano:
 *   put:
 *     summary: Altera o plano no carrinho
 *     tags: [Carrinho]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanoCarrinho'
 *     responses:
 *       201:
 *         description: Plano alteradp com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanoCarrinho'
 */
CarrinhoRouter.put('/plano',
    authorization('Cliente'),
    safeBodyParser(PlanoCarrinhoSchema),
    controller.atualizarPlano
)

export default CarrinhoRouter;