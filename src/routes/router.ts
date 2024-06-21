import { Request, Response, Router } from "express";
import authentication from "../middleware/authenticationMiddleware";
import Administrador from "./administrador.router";
import Assinaturas from "./assinaturas.router";
import Cargos from "./cargos.router";
import Carrinho from "./carrinho.router";
import Categorias from "./categorias.router";
import Clientes from "./clientes.router";
import Compras from "./compras.router";
import Descricoes from "./descricoes.router";
import Funcionarios from "./funcionarios.router";
import Planos from "./planos.router";
import Produtos from "./produtos.router";
import Relatiorios from "./relatorios.router";
import Usuarios from "./usuarios.router";

const router = Router()

router.use(authentication)

/**
 * @swagger
 * /:
 *   get:
 *     tags: ['Olá Mundo!']
 *     summary: Olá, Mundo!
 *     responses:
 *       200:
 *         description: Retorna uma string 'Olá, Mundo'
 */
router.get('/', (req: Request, res: Response) => {
    res.send('Olá, Mundo')
})

router.use('/administrador', Administrador)
router.use('/assinaturas', Assinaturas)
router.use('/cargos', Cargos)
router.use('/carrinho', Carrinho)
router.use('/categorias', Categorias)
router.use('/clientes', Clientes)
router.use('/compras', Compras)
router.use('/descricoes', Descricoes)
router.use('/funcionarios', Funcionarios)
router.use('/planos', Planos)
router.use('/produtos', Produtos)
router.use('/relatorios', Relatiorios)
router.use('/usuarios', Usuarios)

export default router
