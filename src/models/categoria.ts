import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da categoria
 *           example: "Acessórios"
 */

export const CategoriaSchema =  z.object({
    id: z.number().optional(),
    nome: z.string(),
    excluido: z.boolean().optional(),
})

export type Categoria = z.infer<typeof CategoriaSchema>

export function isCategoria(obj: any): obj is Categoria {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'bigint' &&
        typeof obj.nome === 'string' &&
        typeof obj.excluido === 'boolean';
}