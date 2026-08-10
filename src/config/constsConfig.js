//src/config/constsConfig.js

const { loadEnvFile } = require("node:process");

if (process.env.NODE_ENV !== 'production') {
    loadEnvFile('.env');
}

const PORT = process.env.PORT || 3000;
const DB_host = process.env.DB_HOST || 'localhost';
const DB_port = process.env.DB_PORT || 5432;
const DB_database = process.env.DB_NAME; // <-- Cambiado de DB_database a DB_NAME
const DB_user = process.env.DB_USER;     // <-- Cambiado a DB_USER
const DB_password = process.env.DB_PASSWORD; // <-- Cambiado a DB_PASSWORD
const DB_max = process.env.DB_max;
const DB_idleTimeoutMillis = process.env.DB_idleTimeoutMillis;
const DB_connectionTimeoutMillis = process.env.DB_connectionTimeoutMillis;
const DATABASE_URL = process.env.DATABASE_URL; // <-- Corregido el nombre a DATABASE_URL

module.exports = {
    PORT,
    DB_host,
    DB_port,
    DB_database,
    DB_user,
    DB_password,
    DB_max,
    DB_idleTimeoutMillis,
    DB_connectionTimeoutMillis,
    DATABASE_URL // <-- Exportar con el mismo nombre
};