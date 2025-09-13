const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local development server'
      },
      {
        url: 'https://contacts-api-ke.onrender.com',
        description: 'Deployed API on Render'
      }
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
          properties: {
            firstName: {
              type: 'string',
              example: 'Eileen'
            },
            lastName: {
              type: 'string',
              example: 'Doe'
            },
            email: {
              type: 'string',
              example: 'eileen.doe@example.com'
            },
            favoriteColor: {
              type: 'string',
              example: 'Green'
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1999-12-01'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Path to your route files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
