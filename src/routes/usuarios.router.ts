import { Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import safeQueryParser from "../middleware/safeQueryParser";
import queryParamConversion from "../middleware/queryParamConversion";
import { idSchema } from "../utils/QueryParamsSchemas";
import safeBodyParser from "../middleware/safeBodyParser";
import { z } from "zod";
import { NewPasswordSchema } from "../models/usuario";
import authorizationMiddleware from "../middleware/authorizationMiddleware";

const UsuariosRouter = Router();

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
 *  /usuarios/alterar-senha:
 *  put:
 *    summary: Alterar senha
 *    tags: [Usuarios]
 *    description: Altera a senha de um usuário
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPassword'
 *    responses:
 *      200:
 *        description: Senha atualizada.
 *      400:
 *        description: Senha antiga incorreta.
 *      500:
 *        description: Usuário não logado
 *   
 */
UsuariosRouter.put('/alterar-senha',
    safeBodyParser(NewPasswordSchema),
    authController.changePasswordAsUser
)

/**
 *  @swagger
 *  /usuarios/alterar-senha/admin:
 *  put:
 *    summary: Alterar senha
 *    description: Altera a senha de um usuário
 *    tags: [Usuarios]
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: integer
 *        description: id do usuário a ter senha alterada
 *        required: true 
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPassword'
 *    responses:
 *      200:
 *        description: Senha atualizada.
 *      400:
 *        description: Senha antiga incorreta.
 *   
 */
UsuariosRouter.put('/alterar-senha/admin',
    authorizationMiddleware("Administrador"),
    queryParamConversion({id: "int"}),
    safeQueryParser(idSchema),
    safeBodyParser(NewPasswordSchema),
    authController.changePasswordAsUser
)


/**
 *  @swagger
 *  /usuarios/perfil:
 *    get:
 *      summary: Informações do usuário
 *      tags: [Usuarios]
 *      description: Retorna informações do usuário recebendo um token
 *      security:
 *       - BearerAuth: []
 *      responses:
 *        200:
 *          description: Usuário
 *        404:
 *          description: Usuário inexistente para o token informado.
 *        500:
 *          description: Erro interno no servidor
 */
UsuariosRouter.get('/perfil', authenticationMiddleware, authController.getUser);

export default UsuariosRouter;