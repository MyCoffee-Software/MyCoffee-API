import { Categoria } from "./categoria";

export interface Produto {
    id: bigint;
    nome: string;
    preco: number;
    descricao: string;
    desconto_porcentual: number;
    codigo_de_barras: string;
    marca: string;
    excluido: boolean;
    imagens?: string[]
    categorias?: Categoria[]
}