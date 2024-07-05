import { z } from "zod";
import { itemCompraSchema } from "./itemCompra";
import { DateSchema } from "../utils/dateSchema";

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       properties:
 *         idCompra:
 *           type: integer
 *           example: 1
 *         idCliente:
 *           type: integer
 *           example: 1234
 *         cpfComprador:
 *           type: string
 *           example: "123.456.789-00"
 *         dataPagamento:
 *           type: string
 *           format: date
 *           example: "2024-07-03"
 *         formaPagamento:
 *           type: string
 *           example: "cartao de credito"
 *         enderecoEntrega:
 *           type: string
 *           example: "Rua Exemplo, 123, Bairro, Cidade, Estado, CEP"
 *         produtos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemCompra'
 *       required:
 *         - idCompra
 *         - idCliente
 *         - cpfComprador
 *         - dataPagamento
 *         - formaPagamento
 *         - enderecoEntrega
 *         - produtos
 */
export const CompraSchema = z.object({
    idCompra: z.number(),
    idCliente: z.number(),
    cpfComprador: z.string(),
    dataPagamento: DateSchema,
    formaPagamento: z.string(),
    enderecoEntrega: z.string(),
    produtos: z.array(itemCompraSchema)
})

export type Compra = z.infer<typeof CompraSchema> 