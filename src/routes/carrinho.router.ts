import { Request, Response, Router } from "express";

const CarrinhoRouter = Router();

CarrinhoRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Carrinho')
})

export default CarrinhoRouter;