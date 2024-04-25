import { Request, Response, Router } from "express";

const CargosRouter = Router();

CargosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Cargos')
})

export default CargosRouter;