import { Request, Response, Router } from "express";
import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import AdministradorRouter from "./administrador.router";
import AssinaturasRouter from "./assinaturas.router";
import CargosRouter from "./cargos.router";
import CarrinhoRouter from "./carrinho.router";
import CategoriasRouter from "./categorias.router";
import ClientesRouter from "./clientes.router";
import ComprasRouter from "./compras.router";
import DescricoesRouter from "./descricoes.router";
import FuncionariosRouter from "./funcionarios.router";
import PlanosRouter from "./planos.router";
import ProdutosRouter from "./produtos.router";
import RelatoriosRouter from "./relatorios.router";
import UsuariosRouter from "./usuarios.router";

const router = Router()

router.use(authenticationMiddleware)

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

router.use('/administrador', AdministradorRouter)
router.use('/assinaturas', AssinaturasRouter)
router.use('/cargos', CargosRouter)
router.use('/carrinho', CarrinhoRouter)
router.use('/categorias', CategoriasRouter)
router.use('/clientes', ClientesRouter)
router.use('/compras', ComprasRouter)
router.use('/descricoes', DescricoesRouter)
router.use('/funcionarios', FuncionariosRouter)
router.use('/planos', PlanosRouter)
router.use('/produtos', ProdutosRouter)
router.use('/relatorios', RelatoriosRouter)
router.use('/usuarios', UsuariosRouter)

export default router
