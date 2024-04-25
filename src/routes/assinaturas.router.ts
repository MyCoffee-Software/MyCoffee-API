import { Request, Response, Router } from "express";

const AssinaturasRouter = Router();

AssinaturasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Assinaturas')
})

export default AssinaturasRouter;