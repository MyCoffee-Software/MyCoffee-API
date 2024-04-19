"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const swaggerRouter = express_1.default.Router();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentação da API',
            version: '1.0.0',
            description: 'Documentação da API para a minha aplicação',
        },
    },
    apis: ['./routes/*.ts'], // Caminho para os arquivos de rota
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
swaggerRouter.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = swaggerRouter;
