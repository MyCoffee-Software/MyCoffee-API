import { z } from 'zod';
import { CategoriaSchema } from './categoria';

/**
 * @swagger
 * components:
 *   schemas:
 *     Plano:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do Plano
 *           example: "Plano café top"
 *         desconto:
 *           type: number
 *           description: Desconto percentual do plano
 *           example: 20
 *         precoMensal:
 *           type: number
 *           description: Preço mensal do plano
 *           example: 150
 *         precoAnual:
 *           type: number
 *           description: Preço anual do plano
 *           example: 1620
 *         ativo:
 *           type: boolean
 *           description: Plano ativo ou não
 *         descricao:
 *           type: string
 *           description: Descrição dos atrativos do plano
 *           example: 20
 *         imagemPlanoAssinatura:
 *           type: string
 *           description: Caminho da imagem
 *           example: ""
 */

export const PlanoSchema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    desconto: z.number(),
    precoMensal: z.number(),
    precoAnual: z.number(),
    ativo: z.boolean(),
    descricao: z.string(),
    excluido: z.boolean().optional(),
    imagens: z.array(z.string().default(" ")),
    categorias: z.array(CategoriaSchema).optional()
})

export type Plano = z.infer<typeof PlanoSchema>

export function isPlano(obj: any): obj is Plano {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.nome === 'string' &&
        typeof obj.desconto === 'bigint' &&
        typeof obj.precoMensal === 'bigint' &&
        typeof obj.precoAnual === 'bigint' &&
        typeof obj.ativo === 'boolean' &&
        typeof obj.descricao === 'string' &&
        typeof obj.imagem === 'string';
}