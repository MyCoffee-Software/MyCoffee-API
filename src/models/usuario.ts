export interface Usuario {
    id: bigint,
    nomeCompleto: string,
    email: string,
    senha: string,
    excluido: boolean,
}

export function isUsuario(object: unknown): object is Usuario{
    if (typeof object == 'object' && object !== null){
        return ['id', 'nomeCompleto', 'email', 'senha', 'excluido'].every((atributo) => atributo in object)
    }
    return false
}