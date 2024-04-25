import { Request, Response, Router } from "express";

const RelatoriosRouter = Router();

RelatoriosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Relatórios')
})

export default RelatoriosRouter;