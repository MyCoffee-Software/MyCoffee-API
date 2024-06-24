import { Permissao, PermissaoSchema, isPermissao, isPermissoes } from "./permissao"
import { z } from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     Cargo:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do cargo
 *           example: "Vendedor"
 *         permissoes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permissao'
 *           description: Lista de permissões do cargo
 */

export const CargoSchema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    permissoes: z.array(PermissaoSchema).optional(),
    excluido: z.boolean().optional()
})

export type Cargo = z.infer<typeof CargoSchema>

export function isCargo(obj: any): obj is Cargo {
    return typeof obj === 'object' &&
        obj !== null &&
        //typeof obj.id === 'bigint' &&
        typeof obj.nome === 'string' &&
        Array.isArray(obj.permissoes) &&
        isPermissoes(obj.permissoes)
        //typeof obj.excluido === 'boolean';
}