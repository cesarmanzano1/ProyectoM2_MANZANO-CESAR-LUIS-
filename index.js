//index.js

const { pool } = require("./src/config/dbConnect");
const { app } = require("./src/server");

const PORT = 3000;
/*
async function obtenerTodosLosAutores() {
  const result = await pool.query('SELECT * FROM authors');
  return result.rows;
}

async function obtenerAutorPorId(id) {
  const result = await pool.query(`SELECT * FROM authors WHERE id = ${id}`);
  return result.rows[0];
}
async function crearAutor(nombre, email, bio) {
  const result = await pool.query(
    `INSERT INTO authors (name, email, bio) VALUES ('${nombre}', '${email}', '${bio}') RETURNING *`
  );
  return result.rows[0];
}

async function actualizarAutor(id, nuevoNombre) {
  const result = await pool.query(
    `UPDATE authors SET name = '${nuevoNombre}' WHERE id = ${id} RETURNING *`
  );
  return result.rows[0];
}

async function eliminarAutor(id) {
  const result = await pool.query(`DELETE FROM authors WHERE id = ${id}`);
  return result.rowCount; // Cuántas filas se eliminaron
}
async function buscarAutor(nombre) {
  const result = await pool.query(`SELECT * FROM authors WHERE name = '${nombre}'`);
  return result.rows;
}*/

const startServer = async () => {
    try {
        console.log("Intentando conectar a PostgreSQL...");

        const resultado = await pool.query("SELECT 1");
        console.log("Resultado:", resultado.rows);

        app.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`);
        });

        /*/ 1. Llamamos a la función con await y guardamos la lista
        const autores = await obtenerTodosLosAutores();
        
        // 2. Imprimimos el resultado por consola
        console.log("Lista de autores:", autores);*/

    } catch (error) {
        console.error("Error de conexión:");
        console.error(error);
    }
};

startServer();
/*obtenerTodosLosAutores();*/
/*# Instalar Vitest como dependencia de desarrollo
npm install --save-dev vitest

# Instalar supertest para testear endpoints de API
npm install --save-dev supertest

https://ft77-deploy-production.up.railway.app/api-docs/#/
*/