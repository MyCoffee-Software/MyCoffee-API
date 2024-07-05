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
 *         imagem:
 *           type: string
 *           description: URL da imagem do usuário
 *           example: "https://example.com/imagem.jpg"
 */

export const usuarioSchema = z.object({
    id: z.number().optional(),
    nomeCompleto: z.string(),
    email: z.string(),
    senha: z.string().optional(),
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

/**
 * @swagger
 * components:
 *   schemas:
 *     NewPassword:
 *       type: object
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: The current password of the user.
 *         newPassword:
 *           type: string
 *           description: The new password to be set by the user.
 *       required:
 *         - oldPassword
 *         - newPassword
 */
export const NewPasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
})

export type NewPassword = z.infer<typeof NewPasswordSchema>