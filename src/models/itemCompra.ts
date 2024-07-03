import { z } from "zod"

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCompra:
 *       type: object
 *       properties:
 *         idProduto:
 *           type: integer
 *           example: 123
 *         valorUnitario:
 *           type: number
 *           example: 59.99
 *         quantidade:
 *           type: integer
 *           example: 2
 *       required:
 *         - idProduto
 *         - valorUnitario
 *         - quantidade
 */
export const itemCompraSchema = z.object({
    idProduto: z.number(),
    valorUnitario: z.number(),
    quantidade: z.number().positive(),
})

export type ItemCompra = z.infer<typeof itemCompraSchema>