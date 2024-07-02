import {z} from 'zod'
import { PeriodoSchema } from './periodo'

/**
 * @swagger
 * components:
 *   schemas:
 *     PlanoCarrinho:
 *       type: object
 *       properties:
 *         idPlano:
 *           type: integer
 *           description: ID do plano
 *         periodo:
 *           type: string
 *           enum: ['Mensal', 'Anual']
 *           description: Período do plano
 *       required:
 *         - idPlano
 *         - periodo
 *       example:
 *         idCliente: 1
 *         idPlano: 2
 *         periodo: 'Mensal'
 */

export const PlanoCarrinhoSchema = z.object({
  idCliente: z.number().optional(),
  idPlano: z.number(),
  periodo: PeriodoSchema,
})

export type PlanoCarrinho = z.infer<typeof PlanoCarrinhoSchema>
