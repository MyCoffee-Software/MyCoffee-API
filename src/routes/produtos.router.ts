import { Request, Response, Router } from "express";
import { CriarPedido } from "../controllers/produto.controller";
import authorization from "../middleware/authorizationMiddleware";
import { Permissao } from "../models/permissao";

const ProdutosRouter = Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista produtos
 *     description: Retorna os produtos, de acordo com a parametrização
 *     tags: [Produtos]
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
ProdutosRouter.get('/', authorization(), (req: Request, res: Response) => {
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