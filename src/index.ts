import express from "express";
import swaggerRouter from "./swagger";
import router from "./routes/router";
import * as dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client'
import prisma from "./db";

dotenv.config();
const PORT = process.env.API_PORT

const app = express();
app.use(express.json())

app.use(router)

app.use(swaggerRouter)

const Prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})