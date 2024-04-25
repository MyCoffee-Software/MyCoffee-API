import { Request, Response, Router } from "express";

const ClientesRouter = Router();

ClientesRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Clientes')
})

export default ClientesRouter;