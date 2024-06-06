import { usuario } from "@prisma/client";
import { Usuario, isUsuario } from "./usuario";
import { Cargo } from "./cargo";

export interface Funcionario extends Usuario{
    funcionarioExcluido: boolean
    idCargo?: bigint;
}

export function isFuncionario(object: Usuario): object is Funcionario {
    return ['funcionarioExcluido', 'cargo'].every((atributo) => atributo in object)
} 