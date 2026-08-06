// ..src/config/dbConnect.js
//CONECTA  A LA BASE DE DATOS

require("dotenv").config();// SE INSTALA npm install dotenv PARA  CONECTAR CON EL .ENV

//ME CONECTO A LA BASE DE DATOS PG ADMIN INSTALO  npm i pg

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = {
    pool
};