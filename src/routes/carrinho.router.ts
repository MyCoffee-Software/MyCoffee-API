import { Request, Response, Router } from "express";

const CarrinhoRouter = Router();

/**
 *  @swagger
 *  /carrinho:
 *  get:
 *    tags: [Carrinho]
 * 
 *  put:
 *    tags: [Carrinho]
 */

/**
 *  @swagger
 *  /carrinho/assinatura:
 *  get:
 *    tags: [Carrinho]
 * 
 *  post:
 *    tags: [Carrinho]
 * 
 *  put:
 *    tags: [Carrinho]
 */

/**
 *  @swagger
 *  /carrinho/produtos:
 *  post:
 *    tags: [Carrinho]
 */

CarrinhoRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Carrinho')
})

export default CarrinhoRouter;