import { Permissao } from "./permissao"

export interface Cargo {
    id: bigint
    nome: string
    permissoes: Permissao[]
    excluido: boolean
}