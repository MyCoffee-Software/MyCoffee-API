import { Usuario, isUsuario } from "./usuario";

export interface Cliente extends Usuario {
    cpf: string
    telefone: string
    data_nascimento: Date
    endereco: string
    clienteExcluido: boolean
}

export function isCliente(object: Usuario): object is Cliente{
    return ['cpf', 'telefone', 'data_nascimento', 'endereco', 'clienteExcluido'].every((atributo) => atributo in object)
}