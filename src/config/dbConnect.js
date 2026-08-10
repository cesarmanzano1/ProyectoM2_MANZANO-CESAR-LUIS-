//src/config/dbConnect.js
const { Pool } = require('pg')
const { DB_host, DB_port, DB_database, DB_user, DB_password, DB_max, DB_idleTimeoutMillis, DB_connectionTimeoutMillis, DATABASE_URL } = require('./constsConfig')

const configPool = {
    host: DB_host,
    port: DB_port,
    database: DB_database,
    user: DB_user,
    password: DB_password,
    max: DB_max,
    idleTimeoutMillis: DB_idleTimeoutMillis,
    connectionTimeoutMillis: DB_connectionTimeoutMillis
}

const configPoolRailWay = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Requerido para conexiones externas/producción en Railway
    }
};

const pool = new Pool( !DATABASE_URL ? configPool : configPoolRailWay )

module.exports = {
    pool
}