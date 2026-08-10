/* src/server.js */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger");
const { router } = require("./router/router");
const { requestLogger } = require("./middleware/middleware");
const cors = require("cors");

const app = express();

// Ruta de prueba
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API funcionando correctamente"
    });
});

app.use(requestLogger);
app.use(cors());

app.use(express.json());

app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(router);

module.exports = {
    app
};