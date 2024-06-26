import { usuario } from "@prisma/client";
import { Usuario, isUsuario, usuarioSchema } from "./usuario";
import { Cargo, CargoSchema } from "./cargo";
import { z } from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       required:
 *        - usuario
 *       properties:
 *         idCargo:
 *           type: number
 *           description: id do cargo do Funcionaio
 *           example: "1"
 *         usuario:
 *           $ref: '#/components/schemas/Usuario'
 * 
 */


export const funcionarioSchema = z.object({
    id: z.number().optional(),
    usuario: usuarioSchema,
    excluido: z.boolean().optional(),
    idCargo: z.number().optional(),
})

export type Funcionario = z.infer<typeof funcionarioSchema>

export function isFuncionario(object: Usuario): object is Funcionario {
    return ['funcionarioExcluido', 'cargo'].every((atributo) => atributo in object)
} 