/* src/server.js */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger");
const { router } = require("./router/router");
const { requestLogger,errorHandler } = require("./middleware/middleware");
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

// MANEJAR JSON INVÁLIDO
app.use((err, req, res, next) => {
    if (  err instanceof SyntaxError && err.status === 400 &&  err.type === "entity.parse.failed"
    ) {
        return res.status(400).json({
            msg: "El JSON enviado no es válido"
        });
    }

    next(err);
});


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
app.use(errorHandler);



module.exports = {
    app
};