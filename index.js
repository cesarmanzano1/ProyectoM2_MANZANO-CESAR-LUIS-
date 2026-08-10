const { pool } = require("./src/config/dbConnect");
const { app } = require("./src/server");
const { initializeDatabase } = require("./src/config/initDB");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        console.log("Intentando conectar a PostgreSQL...");

        const resultado = await pool.query("SELECT 1");

        console.log("PostgreSQL conectado");
        console.log("Resultado:", resultado.rows);

        await initializeDatabase();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server listen on port ${PORT}`);
        });

    } catch (error) {
        console.error("ERROR AL INICIAR:");
        console.error(error);
        console.error("Mensaje:", error.message);
    }
};

startServer();