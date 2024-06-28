import Admin from "./admin.repository";
import Cargo  from "./cargo.repository";
import Cliente from "./cliente.repositoy";
import Funcionario from "./funcionario.repository";
import Usuario from "./usuario.repository";
import Produto from "./produto.repository";
import Categoria from "./categoria.repositoy";
import PermissoesCargo from "./permissaoCargo.repository";
import Plano from "./planos.repository";
import produtoCategoria from "./produtoCategoria.repository";

const repository = {
    usuario: Usuario,
    admin: Admin,
    funcionario: Funcionario,
    cargo: Cargo,
    permissoesCargo: PermissoesCargo,
    cliente: Cliente,
    produto: Produto,
    categoria: Categoria,
    produtoCategoria: produtoCategoria,
    plano: Plano,
}

export default repository