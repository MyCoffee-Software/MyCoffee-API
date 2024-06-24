import { z } from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     Permissao:
 *       type: string
 *       enum:
 *         - Cliente
 *         - Gerenciar Produto
 *         - Gerenciar Categoria
 *         - Gerenciar Assinatura
 *         - Gerenciar Relatório
 *       description: Tipos de permissão
 */

export const PermissaoSchema = z.enum([
    'Cliente',
    'Administrador',
    'Funcionario',
    'Gerenciar Produto',
    'Gerenciar Categoria',
    'Gerenciar Assinatura',
    'Gerenciar Relatório',
])

export type Permissao = z.infer<typeof PermissaoSchema>

export function isPermissao(obj: any): obj is Permissao {
    return typeof obj === 'string' &&
        (
            obj === 'Cliente' ||
            obj === 'Administrador' ||
            obj === 'Funcionario' ||
            obj === 'Gerenciar Produto' ||
            obj === 'Gerenciar Categoria' ||
            obj === 'Gerenciar Assinatura' ||
            obj === 'Gerenciar Relatório'
        );
}

export function isPermissoes(obj: unknown): obj is Permissao[]{
    return Array.isArray(obj) &&
        obj.every((o) => isPermissao(o))
}
