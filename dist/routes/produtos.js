"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PedidosRouter = (0, express_1.Router)();
/**
 * @swagger
 * /produtos:
 *   get:
 *     description: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Retorna uma lista de clientes
 */
PedidosRouter.get('/', (req, res) => {
    res.send('Olá, você está na controladora Produtos');
});
exports.default = PedidosRouter;
