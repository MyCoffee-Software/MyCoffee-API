import { z } from 'zod'
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *        - nomeCompleto
 *        - email
 *       properties:
 *         nomeCompleto:
 *           type: string
 *           description: Nome completo do usuário
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "joao.silva@example.com"
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *         imagem:
 *           type: string
 *           description: URL da imagem do usuário
 *           example: "https://example.com/imagem.jpg"
 */

export const usuarioSchema = z.object({
    id: z.number().optional(),
    nomeCompleto: z.string(),
    email: z.string(),
    senha: z.string(),
    excluido: z.boolean().optional(),
    imagem: z.string().optional()
})

export type Usuario = z.infer<typeof usuarioSchema>

export function isUsuario(obj: any): obj is Usuario {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'bigint' &&
        typeof obj.nomeCompleto === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.senha === 'string' &&
        typeof obj.excluido === 'boolean' &&
        typeof obj.imagem === 'string';
}