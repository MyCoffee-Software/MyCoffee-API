import { Request, Response, Router } from "express";

const AdministradorRouter = Router();

/**
 * @swagger
 * /administrador:
 *   get:
 *     summary: Obtém os dados de um usuário Administrador
 *     description: Retorna os dados de acordo com o token de autenticação de um Administrador logado
 *     tags: [Administrador]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: Dados do administrador
 */
AdministradorRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Administrador')
})

/**
 * @swagger
 * /administrador:
 *   put:
 *     summary: Altera os dados de um usuário Administrador
 *     description: Altera os dados de acordo com o token de autenticação de um Administrador logado
 *     tags: [Administrador]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: Administrador alterado.
 */

export default AdministradorRouter;