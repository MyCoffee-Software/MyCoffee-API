import { z } from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     Periodo:
 *       type: string
 *       enum:
 *         - Mensal
 *         - Anual
 */
export const PeriodoSchema = z.enum([
  'Mensal',
  'Anual'
])

export type Periodo = z.infer<typeof PeriodoSchema>