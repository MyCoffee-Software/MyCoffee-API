export interface Usuario {
    id: bigint,
    nomeCompleto: string,
    email: string,
    senha: string,
    excluido: boolean,
    imagem: string
}

export function isUsuario(obj: any): obj is Usuario {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'bigint' &&
        typeof obj.nomeCompleto === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.senha === 'string' &&
        typeof obj.excluido === 'boolean' &&
        typeof obj.imagem === 'string';
}