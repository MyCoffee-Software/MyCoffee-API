import { AdminRepository } from "./admin.repository";
import { CargoRepository } from "./cargo.repository";
import { ClienteRepository } from "./cliente.repositoy";
import { FuncionarioRepository } from "./funcionario.repository";
import { UsuarioRepository } from "./usuario.repository";

const repository = {
    usuario: new UsuarioRepository(),
    admin: new AdminRepository(),
    funcionario: new FuncionarioRepository(),
    cargo: new CargoRepository(),
    cliente: new ClienteRepository(),
}

export default repository