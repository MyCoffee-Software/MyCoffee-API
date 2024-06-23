import Admin from "./admin.repository";
import Cargo  from "./cargo.repository";
import Cliente from "./cliente.repositoy";
import Funcionario from "./funcionario.repository";
import Usuario from "./usuario.repository";
import Produto from "./produto.repository";
import Categoria from "./categoria.repositoy";
import PermissoesCargo from "./permissaoCargo.repository"

const repository = {
    usuario: Usuario,
    admin: Admin,
    funcionario: Funcionario,
    cargo: Cargo,
    permissoesCargo: PermissoesCargo,
    cliente: Cliente,
    produto: Produto,
    categoria: Categoria,
}

export default repository