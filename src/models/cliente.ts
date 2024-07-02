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
 *         endereco:
 *           type: string
 *           description: Endereço do cliente
 *           example: "rua sao paulo"
 *         cep:
 *           type: string
 *           description: CEP do cliente
 *           example: "791178029"
 *         estado:
 *           type: string
 *           description: Estado do cliente
 *           example: "São Paulo"
 *         cidade:
 *           type: string
 *           description: Cidade do cliente
 *           example: "Campinas"
 *         numero:
 *           type: string
 *           description: Número da residência do cliente
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
    //data_nascimento: z.coerce.date(),
    endereco: z.string(),
    cep: z.string(),
    estado: z.string(),
    cidade: z.string(),
    numero: z.string(),
    excluido: z.boolean().optional()
});

export type Cliente = z.infer<typeof clienteSchema>;

export function isCliente(object: Usuario): object is Cliente{
    return ['cpf', 'telefone', /*'data_nascimento',*/ 'endereco', 'cep', 'estado', 'cidade', 'numeros', 'clienteExcluido'].every((atributo) => atributo in object)
}