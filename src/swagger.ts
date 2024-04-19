import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import fs from 'fs';
import path from 'path';

const swaggerRouter = express.Router();

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

const swaggerSpec = swaggerJsdoc(options);

swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
