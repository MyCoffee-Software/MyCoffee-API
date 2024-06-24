import {z} from 'zod'
export const idSchema = z.object({
    id: z.number()
})

export const paginacaoSchema = z.object({
    pagina: z.number(),
    limite: z.number()
})

export const idOuPaginacaoSchema = z.union([
    idSchema,
    paginacaoSchema,
])