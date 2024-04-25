import { Request, Response, Router } from "express";

const CategoriasRouter = Router();

CategoriasRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Categorias')
})

export default CategoriasRouter;