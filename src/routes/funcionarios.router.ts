import { Request, Response, Router } from "express";

const FuncionariosRouter = Router();

/**
 *  @swagger
 *  /funcionarios:
 *  get:
 *    tags: [Funcionarios]
 * 
 *  post:
 *    tags: [Funcionarios]
 * 
 *  put:
 *    tags: [Funcionarios]
 * 
 *  delete:
 *    tags: [Funcionarios]
 * 
 */
FuncionariosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Funcionários')
})

export default FuncionariosRouter;