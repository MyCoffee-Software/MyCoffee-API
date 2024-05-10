import { Request, Response, Router } from "express";
import { autenticar } from "../controllers/autenticacao.controller";

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

/**
 *  @swagger
 *  /usuarios/validar:
 *  post:
 *    summary: Retorna um token de autenticação
 *    description: Valida credenciais e retorna, se autenticado, um token válido por 1 minuto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Um token com informações de usuário e validade de 1 minuto
 *      400:
 *        description: Não autenticado
 * 
 */
UsuariosRouter.post('/validar', autenticar)

export default UsuariosRouter;