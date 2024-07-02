import {z} from 'zod'
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



