import {z} from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCarrinho:
 *       type: object
 *       properties:
 *         idProduto:
 *           type: number
 *           description: id do Produto
 *           example: 20
 *         quantidade:
 *           type: number
 *           description: Quantidade do item
 *           example: 1
 *     ListaItensCarrinho:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ItemCarrinho'
 */

export const itemCarrinhoSchema = z.object({
  idCliente: z.number().optional(),
  idProduto: z.number(),
  quantidade: z.number().positive(),
})

export type ItemCarrinho = z.infer<typeof itemCarrinhoSchema>

