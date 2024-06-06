export type Permissao = 
    'Administrador' |
    'Gerenciar Produto' |
    'Gerenciar Categoria' |
    'Gerenciar Assinatura' |
    'Gerenciar Relatório'

export function isPermissao(object: unknown): object is Permissao{
    if (typeof object == 'string'){
        return ['Administrador', 'Gerenciar Produto', 'Gerenciar Categoria', 'Gerenciar Assinatura', 'Gerenciar Relatório'].includes(object)
    }

    return false
}