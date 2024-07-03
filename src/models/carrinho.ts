import { z } from "zod";
import { ProdutoSchema } from "./produto";
import { Categoria, CategoriaSchema } from "./categoria";
import { Periodo, PeriodoSchema } from "./periodo";

const itemCarrinhoSchema = z.object({
    idProduto: z.number(),
    nome: z.string(),
    preco: z.number(),
    descricao: z.string(),
    codigo_de_barras: z.string(),
    marca: z.string(),
    imagens: z.string().optional(),
    categorias: z.array(CategoriaSchema).optional(),
    quantidade: z.number(),
    subTotal: z.number(),
    descontos: z.object({
        produto: z.object({
            porcentual: z.number(),
            real: z.number()
        }),
        plano: z.object({
            porcentual: z.number(),
            real: z.number()
        }),
        descontosTotais: z.number()
    }),
    total: z.number()
})

export type itemCarrinhoOutput = {
    idProduto: number,
    nome: string,
    preco: number,
    descricao: string,
    codigo_de_barras: string,
    marca: string,
    imagens?: string,
    categorias?: Categoria[],
    quantidade: number,
    subTotal: number,
    descontos?:{
        produto?: {
            porcentual: number,
            real: number
        },
        plano?: {
            porcentual: number,
            real: number
        },
        descontosTotais: number
    },
    total: number
}

const planoCarrinhoSchema = z.object({
    idPlano: z.number(),
    nome: z.string(),
    desconto: z.number(),
    precoMensal: z.number(),
    precoAnual: z.number(),
    ativo: z.boolean(),
    descricao: z.string(),
    imagem: z.string().default(" "),
    categorias: z.array(CategoriaSchema).optional(),
    periodo: PeriodoSchema,
    total: z.number()
})

export type PlanoCarrinhoOutput = {
    idPlano: number,
    nome: string,
    desconto: number,
    precoMensal: number,
    precoAnual: number,
    ativo: boolean,
    descricao: string,
    imagem?: string,
    categorias: Categoria[],
    periodo: Periodo,
    total: number
}

const CarrinhoSchema = z.object({
    produtos: z.array(itemCarrinhoSchema),
    plano: planoCarrinhoSchema,
    total: z.number()
})

export type Carrinho = {
    produtos?: itemCarrinhoOutput[],
    plano?: PlanoCarrinhoOutput,
    total: number
}

