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
                - Matias Benitez: soporte@example.com
                - Hector Garcia: garcia17h@gmail.com
            `
            
            ,
            contact: {
                name: 'Developers',
                url: 'https://discord.com/channels/1290434311845318779/1290434312604221475'
            },
            'x-contacts': [
                {
                    name: 'Matias Benitez',
                    email: 'soporte@example.com',
                },
                {
                    name: 'Hector Garcia',
                    email: 'rp@example.com',
                }
            ],
            servers: [
                {
                    url: 'https://c21-71-n-node-react-production.up.railway.app/',
                    description: 'server deployed'
                }
            ]
        }
    },
    apis: ['./swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;
