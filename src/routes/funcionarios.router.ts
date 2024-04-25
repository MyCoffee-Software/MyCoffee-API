import { Request, Response, Router } from "express";

const FuncionariosRouter = Router();

FuncionariosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Funcionários')
})

export default FuncionariosRouter;