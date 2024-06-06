import { Usuario, isUsuario } from "./usuario";

export interface Admin extends Usuario{
    adminExcluido: boolean
}

export function isAdmin<T extends Usuario>(object: Usuario): object is Admin {
    return 'adminExcluido' in object
}