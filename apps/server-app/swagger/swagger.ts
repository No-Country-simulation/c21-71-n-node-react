import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pet API',
            version: '1.0.0',
            description: `
            API para mantenimiento de pagina web de adopcion de animales
            
            Contactos
                [Matias Benitez](https://github.com/novamatt)
                [Hector Garcia](https://github.com/hector-garcia-27)
            `
            
            ,
            contact: {
                name: 'Developers',
                url: 'https://discord.com/channels/1290434311845318779/1290434312604221475'
            },
            servers: [
                {
                    url: `http://localhost:${process.env.PORT}`,
                    description: 'server deployed'
                }
            ]
        }
    },
    apis: ['./swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;
