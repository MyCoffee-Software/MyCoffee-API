import {z} from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCarrinho:
 *       type: object
 *       properties:
 *         idCliente:
 *           type: number
 *           description: id do Cliente dono do carrinho
 *           example: 1
 *         idProduto:
 *           type: number
 *           description: id do Produto
 *           example: 20
 *         quantidade:
 *           type: number
 *           description: Quantidade do item
 *           example: 1
 */

export const itemCarrinhoSchema = z.object({
  idCliente: z.number().optional(),
  idProduto: z.number(),
  quantidade: z.number().positive(),
})

export type ItemCarrinho = z.infer<typeof itemCarrinhoSchema>

