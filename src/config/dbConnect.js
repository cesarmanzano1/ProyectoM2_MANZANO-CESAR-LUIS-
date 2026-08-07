// ..src/config/dbConnect.js
//CONECTA  A LA BASE DE DATOS

require("dotenv").config();// SE INSTALA npm install dotenv PARA  CONECTAR CON EL .ENV

//ME CONECTO A LA BASE DE DATOS PG ADMIN INSTALO  npm i pg

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = { pool };