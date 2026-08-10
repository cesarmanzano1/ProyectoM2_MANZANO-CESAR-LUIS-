// ..src/config/dbConnect.js
//CONECTA  A LA BASE DE DATOS

/*require("dotenv").config();// SE INSTALA npm install dotenv PARA  CONECTAR CON EL .ENV*/

//ME CONECTO A LA BASE DE DATOS PG ADMIN INSTALO  npm i pg

/*require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,

    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = { pool };*/
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: false,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = { pool };