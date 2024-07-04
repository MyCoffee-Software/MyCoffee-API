import express from "express";
import swaggerRouter from "./swagger";
import router from "./routes/router";
import * as dotenv from 'dotenv';
import cors from 'cors';
import {PrismaClient} from '@prisma/client'
import prisma from "./db";
import prepareDirectories from "./utils/prepareDirectories";

dotenv.config();
const PORT = process.env.API_PORT

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(router)

app.use(swaggerRouter)

prepareDirectories()

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})