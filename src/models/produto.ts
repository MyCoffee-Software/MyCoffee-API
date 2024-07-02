import { Categoria, CategoriaSchema, isCategoria } from "./categoria";
import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do Produto
 *           example: "café amargo"
 *         preco:
 *           type: number
 *           description: Preço do produto
 *           example: 20
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *           example: "Um café bem amargo"
 *         desconto_porcentual:
 *           type: number
 *           description: Desconto do produto
 *           example: 10
 *         codigo_de_barras:
 *           type: string
 *           description: Codigo de barras de um produto
 *         marca:
 *           type: string
 *           description: Marca do produto
 *           example: 20
 */

export const ProdutoSchema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    preco: z.number(),
    descricao: z.string(),
    desconto_porcentual: z.number(),
    codigo_de_barras: z.string(),
    marca: z.string(),
    excluido: z.boolean().optional(),
    imagens: z.string().optional(),
    categorias: z.array(CategoriaSchema).optional()
});

export type Produto = z.infer<typeof ProdutoSchema>

export function isProduto(obj: any): obj is Produto {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'bigint' &&
        typeof obj.nome === 'string' &&
        typeof obj.preco === 'number' &&
        typeof obj.descricao === 'string' &&
        typeof obj.desconto_porcentual === 'number' &&
        typeof obj.codigo_de_barras === 'string' &&
        typeof obj.marca === 'string' &&
        typeof obj.excluido === 'boolean' &&
        (obj.imagens === undefined || 
         (Array.isArray(obj.imagens) && obj.imagens.every((img: any) => typeof img === 'string'))) &&
        (obj.categorias === undefined || 
         (Array.isArray(obj.categorias) && obj.categorias.every((cat: any) => isCategoria(cat))));
}