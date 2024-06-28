import { Usuario, isUsuario, usuarioSchema } from "./usuario";
import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *        - usuario
 *       properties:
 *         cpf:
 *           type: string
 *           description: Cpf do cliente
 *           example: "00011122233"
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *           example: "67999998888"
 *         dataNascimento:
 *           type: string
 *           description: Data de nascimento do cliente
 *           example: "2012-01-09"
 *         endereco:
 *           type: string
 *           description: Endereço do cliente
 *           example: "rua sao paulo"
 *         usuario:
 *           $ref: '#/components/schemas/Usuario'
 * 
 */

export const clienteSchema = z.object({
    id: z.number().optional(),
    usuario: usuarioSchema,
    cpf: z.string(),
    telefone: z.string(),
    data_nascimento: z.coerce.date(),
    endereco: z.string(),
    excluido: z.boolean().optional()
});

export type Cliente = z.infer<typeof clienteSchema>;

export function isCliente(object: Usuario): object is Cliente{
    return ['cpf', 'telefone', 'data_nascimento', 'endereco', 'clienteExcluido'].every((atributo) => atributo in object)
}