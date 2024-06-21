import { Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";

const UsuariosRouter = Router();

// /**
//  *  @swagger
//  *  /usuarios:
//  *  get:
//  *    summary: Retorna uma string de indicação
//  *    tags: [Usuarios]
//  *    description: Retorna uma string de indicação
//  *    responses:
//  *      200:
//  *        description: Uma string de indicação
//  *      500:
//  *        description: Erro iinterno do servidor
//  * 
//  */
UsuariosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Usuários')
})

/**
 *  @swagger
 *  /usuarios/login:
 *  post:
 *    summary: Validar credenciais
 *    tags: [Usuarios]
 *    description: Valida credenciais e retorna, se autenticado, um token válido por 1 minuto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - senha
 *            properties:
 *              email:
 *                type: string
 *              senha:
 *                type: string
 *    responses:
 *      200:
 *        description: Um token com informações de usuário e validade de 1 minuto
 *      401:
 *        description: Não autenticado
 * 
 */
UsuariosRouter.post('/login', authController.login)



/**
 *  @swagger
 *  /usuarios/recuperar-senha:
 *  post:
 *    summary: Recuperar senha
 *    tags: [Usuarios]
 *    description: Inicia o processo de recuperação de senha à partir de um e-mail
 * 
 *    parameters:
 *    - in: path
 *      name: email
 *      description: Email do usuário que se deseja alterar a senha
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Email de verificação enviado.
 *      404:
 *        description: Usuário inexistente para o email informado.
 *      500:
 *        description: Erro interno no servidor
 *   
 */

/**
 *  @swagger
 *  /usuarios/alterar-senha:
 *  put:
 *    summary: Alterar senha
 *    tags: [Usuarios]
 *    description: Altera a senha de um usuário
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - senha
 *            properties:
 *              email:
 *                type: string
 *              senha:
 *                type: string
 *    responses:
 *      200:
 *        description: Email de verificação enviado.
 *      404:
 *        description: Usuário inexistente para o email informado.
 *      500:
 *        description: Erro interno no servidor
 *   
 */



export default UsuariosRouter;