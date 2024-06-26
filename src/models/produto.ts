import { Categoria, isCategoria } from "./categoria";

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