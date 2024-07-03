import { z } from "zod";
import { ProdutoSchema } from "./produto";
import { CategoriaSchema } from "./categoria";
import { PeriodoSchema } from "./periodo";

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

const CarrinhoSchema = z.object({
    produtos: z.array(itemCarrinhoSchema),
    plano: planoCarrinhoSchema,
    total: z.number()
})

export type Carrinho = z.infer<typeof CarrinhoSchema>

