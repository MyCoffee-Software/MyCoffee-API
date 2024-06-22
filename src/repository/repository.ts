import Admin from "./admin.repository";
import Cargo  from "./cargo.repository";
import Cliente from "./cliente.repositoy";
import Funcionario from "./funcionario.repository";
import Usuario from "./usuario.repository";
import Produto from "./produto.repository";
import Categoria from "./categoria.repositoy";

const repository = {
    usuario: Usuario,
    admin: Admin,
    funcionario: Funcionario,
    cargo: Cargo,
    cliente: Cliente,
    produto: Produto,
    categoria: Categoria,
}

export default repository