export interface Categoria {
    id: bigint,
    nome: string,
    excluido: boolean,
}

export function isCategoria(obj: any): obj is Categoria {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'bigint' &&
        typeof obj.nome === 'string' &&
        typeof obj.excluido === 'boolean';
}