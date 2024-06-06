import { Permissao } from "./permissao"

export interface Cargo {
    nome: string
    permissoes: Permissao[]
    excluido: boolean
}