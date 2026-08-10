const { pool } = require("./dbConnect");

const initializeDatabase = async () => {

    console.log("INICIANDO CREACION DE TABLAS...");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS authors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            bio TEXT NOT NULL
        )
    `);

    console.log("TABLA AUTHORS OK");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            author_id INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            published BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES authors(id)
        )
    `);

    console.log("TABLA POSTS OK");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            FOREIGN KEY (author_id) REFERENCES authors(id),
            FOREIGN KEY (post_id) REFERENCES posts(id)
        )
    `);

    console.log("TABLA COMMENTS OK");

    console.log("BASE DE DATOS INICIALIZADA CORRECTAMENTE");
};

module.exports = {
    initializeDatabase
};