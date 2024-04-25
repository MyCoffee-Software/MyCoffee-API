import { Request, Response, Router } from "express";

const DescricoesRouter = Router();

DescricoesRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Descrições')
})

export default DescricoesRouter;