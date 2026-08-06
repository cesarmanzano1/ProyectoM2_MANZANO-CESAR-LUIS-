// ..src/config/initDB.js


const { pool } = require("./dbConnect");

const initializeDatabase = async () => {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(100) NOT NULL DEFAULT 'student'
        )
    `);

    const response = await pool.query('SELECT COUNT(*)::int AS total FROM users');

    if(response.rows[0].total === 0){
        await pool.query('INSERT INTO users(name, role) VALUES ($1, $2), ($3, $4)', ['ana', 'student', 'hessan', 'student'])
    }
}

module.exports = {
    initializeDatabase
}