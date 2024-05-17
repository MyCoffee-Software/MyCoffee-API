import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerRouter = express.Router()

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API',
      version: '1.0.0',
      description: 'Documentação da API para a minha aplicação',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./dist/routes/*.js'], // Caminho para os arquivos de rota
};

const specs = swaggerJsdoc(options)

swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export default swaggerRouter
