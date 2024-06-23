import { Permissao, PermissaoSchema, isPermissao, isPermissoes } from "./permissao"
import { z } from 'zod'

const CargoSchema = z.object({
    id: z.bigint(),
    nome: z.string(),
    permissoes: z.array(PermissaoSchema).optional(),
    excluido: z.boolean()
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