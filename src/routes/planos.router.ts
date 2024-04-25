import { Request, Response, Router } from "express";

const PlanosRouter = Router();

PlanosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Planos')
})

export default PlanosRouter;