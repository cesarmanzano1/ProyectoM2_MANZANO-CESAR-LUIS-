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
    url:
      process.env.RAILWAY_PUBLIC_DOMAIN
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "http://localhost:3000",
    description: "Servidor",
  },
],
  },
  apis: ["./src/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec
};
