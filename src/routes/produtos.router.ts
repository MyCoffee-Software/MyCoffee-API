import { Request, Response, Router } from "express";
import { CriarPedido } from "../controllers/produto.controller";
import { authorizationMiddleware } from "../middleware/authorizationMiddleware";
import { Permissao } from "../models/permissao";

const ProdutosRouter = Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     description: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Retorna uma lista de clientes
 */
ProdutosRouter.get('/', authorizationMiddleware(), (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Produtos')
})

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
ProdutosRouter.post('/', authorizationMiddleware("Administrador") ,CriarPedido)

export default ProdutosRouter;