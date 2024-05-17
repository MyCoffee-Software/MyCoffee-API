import express, { Router } from "express";
import swaggerRouter from "./swagger";
import router from "./routes/router";


const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json())

app.use(router)

app.use(swaggerRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})