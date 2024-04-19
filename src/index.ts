import express from "express";
import PedidosRouter from "./routes/produtos";
import swaggerRouter from "./swagger";


const app = express();
const PORT = process.env.PORT || 3000;

console.log('olá mundo')

app.get('/', (req, res) => {
    res.send('Olá, Mundo')
})

app.use('/pedidos', PedidosRouter)

app.use(swaggerRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})