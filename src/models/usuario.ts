export interface Usuario {
    id: bigint,
    nomeCompleto: string,
    email: string,
    senha: string,
    excluido: boolean,
    imagem: string
}

export function isUsuario(object: unknown): object is Usuario{
    if (typeof object == 'object' && object !== null){
        return Object.keys(object)
            .every((key) => ['id', 'nomeCompleto', 'email', 'senha', 'excluido', 'imagem'].includes(key))
    }
    return false
}