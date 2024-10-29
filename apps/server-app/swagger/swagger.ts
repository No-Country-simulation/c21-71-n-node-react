import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pet API',
            version: '1.0.0',
            description: 'API para mantenimiento de pagina web de adopcion de animales',
            contact: {
                name: 'Hector Garcia'
            },
            servers: [
                {
                    url: 'http://localhost:3001',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['src/routes/*.ts']
};

const specs = swaggerJsdoc(options);
export default specs;
