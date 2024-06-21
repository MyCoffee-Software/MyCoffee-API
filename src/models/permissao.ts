export type Permissao = 
    'Cliente Logado' |
    'Administrador' |
    'Gerenciar Produto' |
    'Gerenciar Categoria' |
    'Gerenciar Assinatura' |
    'Gerenciar Relatório'

export function isPermissao(object: unknown): object is Permissao{
    if (typeof object == 'string'){
        return ['Administrador', 'Gerenciar Produto', 'Gerenciar Categoria', 'Gerenciar Assinatura', 'Gerenciar Relatório', 'Cliente Logado'].includes(object)
    }

    return false
}