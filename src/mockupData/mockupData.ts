type Usuario = {
    id: number,
    nome_completo: string,
    email: string,
    senha: string,
    excluido: boolean,
    imagem?: Buffer
}

type Admin = {
    usuarioId: number
}

type Funcionario = {
    usuarioId: number
    cargoId: number
}

type Cargo = {
    id: number,
    nome: string,
    permissoes: Array<Permissao>
}

type Cliente = {
    usuarioId: number
    cpf: string,
    telefone: string,
    endereco: string,
    dataNascimento: Date,
    excluido: boolean
}

enum Permissao {
    GPr = 'GerenciarProdutos',
    GPl = 'GerenciarPlanos',
    GD = 'GerenciarDescricoes',
}

export const usuarios: Array<Usuario> = [
    {
        id: 1,
        nome_completo: 'Fulano da Silva',
        email: 'fulano_silva@email.com',
        senha: '$2b$10$oC5VcqS4Oq/SZ7CwKx9xC.IlTmC1ze5OHYu1oqMHXJVKdLfN1f8XS',//senha123
        excluido: false
    },
    
    {
        id: 2,
        nome_completo: 'Ciclano de Souza',
        email: 'ciclano_souza@email.com',
        senha: '$2b$10$oC5VcqS4Oq/SZ7CwKx9xC.IlTmC1ze5OHYu1oqMHXJVKdLfN1f8XS',//senha123
        excluido: false
    },
    
    {
        id: 1,
        nome_completo: 'Beltrano Ferreira',
        email: 'beltrano_ferreira@email.com',
        senha: '$2b$10$oC5VcqS4Oq/SZ7CwKx9xC.IlTmC1ze5OHYu1oqMHXJVKdLfN1f8XS',//senha123
        excluido: false
    }
]

export const admins: Array<Admin> = [
    {usuarioId: 1}
]

export const funcionarios: Array<Funcionario> = [
    {
        usuarioId: 2,
        cargoId: 1
    }
]

export const cargos: Array<Cargo> = [
    {
        id: 1,
        nome: 'Estoquista',
        permissoes: [
            Permissao.GPr
        ]
    }
]

export const clientes: Array<Cliente> = [
    {
        usuarioId: 3,
        cpf: '123.456.789-10',
        endereco: 'Rua dos bobos, 0',
        telefone: '+55 67 98765-4321',
        dataNascimento: new Date('2000-10-22'),
        excluido: false
    }
]