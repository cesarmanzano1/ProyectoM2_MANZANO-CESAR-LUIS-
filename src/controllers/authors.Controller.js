// ..src/controllers/authors.Controller.js

// src/controllers/authors.Controller.js

const { pool } = require("../config/dbConnect");


// ===============================
// GET /authors
// Obtener todos los autores
// ===============================
const getlibrosController = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM authors ORDER BY id"
        );

        res.status(200).json({
            msg: "Autores encontrados",
            data: result.rows
        });

    } catch (error) {
        console.error("Error al obtener autores:", error);

        res.status(500).json({
            msg: "Error al obtener los autores"
        });
    }
};


// ===============================
// GET /authors/:id
// Obtener un autor por ID
// ===============================
const getUserByIdlibrosController = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM authors WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Autor no encontrado"
            });
        }

        res.status(200).json({
            msg: "Autor encontrado",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error al obtener el autor:", error);

        res.status(500).json({
            msg: "Error al obtener el autor"
        });
    }
};


// ===============================
// POST /authors
// Crear un nuevo autor
// ===============================
const postaddauthor = async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        const result = await pool.query(
            `INSERT INTO authors (name, email, bio)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, bio]
        );

        res.status(201).json({
            msg: "Autor agregado correctamente",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error al crear el autor:", error);

        // Error por email duplicado
        if (error.code === "23505") {
            return res.status(400).json({
                msg: "El email ya está registrado"
            });
        }

        res.status(500).json({
            msg: "Error al crear el autor"
        });
    }
};


// ===============================
// PUT /authors/:id
// Actualizar un autor
// ===============================
const putactualizarauthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;

        const result = await pool.query(
            `UPDATE authors
             SET name = $1,
                 email = $2,
                 bio = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, bio, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: `El autor con id ${id} no fue encontrado`
            });
        }

        res.status(200).json({
            msg: "Autor actualizado correctamente",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error al actualizar el autor:", error);

        // Email duplicado
        if (error.code === "23505") {
            return res.status(400).json({
                msg: "El email ya está registrado"
            });
        }

        res.status(500).json({
            msg: "Error al actualizar el autor"
        });
    }
};


// ===============================
// DELETE /authors/:id
// Eliminar un autor
// ===============================
const deleteauthor = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM authors WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: `El autor con id ${id} no fue encontrado`
            });
        }

        res.status(200).json({
            msg: "Autor eliminado correctamente",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error al eliminar el autor:", error);

        res.status(500).json({
            msg: "Error al eliminar el autor"
        });
    }
};


// ===============================
// EXPORTACIONES
// ===============================
module.exports = {
    getlibrosController,
    getUserByIdlibrosController,
    postaddauthor,
    putactualizarauthor,
    deleteauthor
};