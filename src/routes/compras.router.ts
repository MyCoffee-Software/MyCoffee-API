import { Request, Response, Router } from "express";

const ComprasRouter = Router();

ComprasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Compras')
})

export default ComprasRouter;