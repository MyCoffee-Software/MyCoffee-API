import { z } from 'zod'

export const PeriodoSchema = z.enum([
  'Mensal',
  'Anual'
])

export type Periodo = z.infer<typeof PeriodoSchema>