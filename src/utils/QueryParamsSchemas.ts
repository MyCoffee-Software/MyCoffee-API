import {z} from 'zod'
import { DateSchema } from './dateSchema'
export const idSchema = z.object({
    id: z.number()
})

export const idArraySchema = z.array(z.number())

export const paginacaoSchema = z.object({
    pagina: z.number(),
    limite: z.number()
})

export const idOuPaginacaoSchema = z.union([
    idSchema,
    paginacaoSchema,
])

export const produtoGetQuerySchema = z.union([
    idSchema,
    z.object({
        pagina: z.number(),
        limite: z.number(),
        categoria: z.number().optional(),
        texto: z.string().optional()
    })
])

/**
 * @swagger
 * components:
 *   schemas:
 *     DataInicialFinal:
 *       type: object
 *       properties:
 *         dataInicial:
 *           type: string
 *           description: Data inicial no formato AAAA-MM-DD
 *           example: "2024-05-01"
 *         dataFinal:
 *           type: string
 *           description: Data final no formato AAAA-MM-DD
 *           example: "2024-05-01"
 *         
 */
export const DataInicialFinalSchema = z.object({
    dataInicial: DateSchema,
    dataFinal: DateSchema
})



