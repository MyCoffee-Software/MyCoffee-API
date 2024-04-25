import express from "express";
import ProdutosRouter from "./routes/produtos.router";
import swaggerRouter from "./swagger";
import AdministradorRouter from "./routes/administrador.router";
import AssinaturasRouter from "./routes/assinaturas.router";
import CargosRouter from "./routes/cargos.router";
import CarrinhoRouter from "./routes/carrinho.router";
import CategoriasRouter from "./routes/categorias.router";
import ClientesRouter from "./routes/clientes.router";
import ComprasRouter from "./routes/compras.router";
import DescricoesRouter from "./routes/descricoes.router";
import FuncionariosRouter from "./routes/funcionarios.router";
import PlanosRouter from "./routes/planos.router";
import RelatoriosRouter from "./routes/relatorios.router";
import UsuariosRouter from "./routes/usuarios.router";


const app = express();
const PORT = process.env.PORT || 3000;

console.log('olá mundo')

app.get('/', (req, res) => {
    res.send('Olá, Mundo')
})

app.use('/administrador', AdministradorRouter)
app.use('/assinaturas', AssinaturasRouter)
app.use('/cargos', CargosRouter)
app.use('/carrinho', CarrinhoRouter)
app.use('/categorias', CategoriasRouter)
app.use('/clientes', ClientesRouter)
app.use('/compras', ComprasRouter)
app.use('/descricoes', DescricoesRouter)
app.use('/funcionarios', FuncionariosRouter)
app.use('/planos', PlanosRouter)
app.use('/produtos', ProdutosRouter)
app.use('/relatorios', RelatoriosRouter)
app.use('/usuarios', UsuariosRouter)

app.use(swaggerRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})