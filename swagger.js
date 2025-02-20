import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WikiLuke API',
      version: '1.0.0',
      description: 'API for managing words, quotes, advice, and learnings'
    },
    tags: [
      { name: 'Words' },
      { name: 'Quotes' },
      { name: 'Advice' },
      { name: 'Learnings' },
      { name: 'Highlights' },
      { name: 'Random' }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
