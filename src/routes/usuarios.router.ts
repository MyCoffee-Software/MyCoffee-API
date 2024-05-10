import { Request, Response, Router } from "express";

const UsuariosRouter = Router();

/**
 *  @swagger
 *  /usuarios:
 *  get:
 *    summary: Retorna uma string de indicação
 *    description: Retorna uma string de indicação
 *    responses:
 *      200:
 *        description: Uma string de indicação
 *      500:
 *        description: Erro iinterno do servidor
 * 
 */
UsuariosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Usuários')
})

export default UsuariosRouter;