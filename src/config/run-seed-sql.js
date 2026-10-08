
const fs = require("fs");
const path = require("path");
const { pool } = require("./dbConnect");

const ejecutarSeed = async () => {
    try {
        console.log("Cargando datos de prueba...");

        const rutaSeed = path.join(
            __dirname,
            "..",
            "base_de_datos",
            "seed.sql"
        );

        const sql = fs.readFileSync(rutaSeed, "utf8");

        await pool.query(sql);

        console.log("DATOS DE PRUEBA CARGADOS CORRECTAMENTE");

    } catch (error) {
        console.error("ERROR AL CARGAR EL SEED:", error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
};

ejecutarSeed();