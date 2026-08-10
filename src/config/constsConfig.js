//src/config/constsConfig.js

const {loadEnvFile} = require("node:process")

if(process.env.NODE_ENV !== 'production'){
    loadEnvFile('.env')
}
const PORT=process.env.PORT || 3000
const DB_host = process.env.DB_host || 'localhost'
const DB_port = process.env.DB_port || 5432
const DB_database = process.env.DB_database
const DB_user = process.env.DB_user
const DB_password = process.env.DB_password
const DB_max = process.env.DB_max
const DB_idleTimeoutMillis = process.env.DB_idleTimeoutMillis
const DB_connectionTimeoutMillis = process.env.DB_connectionTimeoutMillis
const DATA_BASE_URL = process.env.DATABASE_URL

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
    DATA_BASE_URL
}