
//src/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autores y Posts",
      version: "1.0.0",
      description: "Documentación Swagger para la API que gestiona autores y publicaciones."
    },
    servers: [
      {
        url: "/",
        description: "Proyectom2manzano-cesar-luis-production.up.railway.app"
      },
    /*  {
        url: "https://proyectom2manzano-cesar-luis-production.up.railway.app",
        description: "Servidor Railway producción"
      },*/
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ]
  },
  apis: ["./src/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec
};