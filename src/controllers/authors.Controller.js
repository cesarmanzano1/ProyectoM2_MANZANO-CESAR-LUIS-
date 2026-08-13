// ..src/controllers/authors.Controller.js

const { pool } = require("../config/dbConnect");

// GET /authors
const getlibrosController = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM authors ORDER BY id"
        );

        res.status(200).json({
            msg: "Autores encontrados",
            data: resultado.rows
        });

    } catch (error) {

        console.error("Error al obtener autores:", error);

        res.status(500).json({
            msg: "Error al obtener los autores"
        });
    }

};

// GET /authors/
const getUserByIdlibrosController = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM authors WHERE id = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                msg: "Autor no encontrado"
            });
        }

        res.status(200).json({
            msg: "Autor encontrado",
            data: resultado.rows[0]
        });

    } catch (error) {

        console.error("Error al obtener el autor:", error);

        res.status(500).json({
            msg: "Error al obtener el autor"
        });
    }

};

// POST /authors
const postaddauthor = async (req, res) => {

    try {

        const { name, email, bio } = req.body;

        const resultado = await pool.query(
            `INSERT INTO authors (name, email, bio)
         VALUES ($1, $2, $3)
         RETURNING *`,
            [name, email, bio]
        );

        res.status(201).json({
            msg: "Autor agregado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {

        console.error("Error al crear el autor:", error);

        if (error.code === "23505") {
            return res.status(400).json({
                msg: "El correo electrónico ya está registrado"
            });
        }

        res.status(500).json({
            msg: "Error al crear el autor"
        });
    }

};

// PUT /authors/
const putactualizarauthor = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email, bio } = req.body;

        const resultado = await pool.query(
            `UPDATE authors
         SET name = $1,
             email = $2,
             bio = $3
         WHERE id = $4
         RETURNING *`,
            [name, email, bio, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                msg: `El autor con id ${id} no fue encontrado`
            });
        }

        res.status(200).json({
            msg: "Autor actualizado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {

        console.error("Error al actualizar el autor:", error);

        if (error.code === "23505") {
            return res.status(400).json({
                msg: "El correo electrónico ya está registrado"
            });
        }

        res.status(500).json({
            msg: "Error al actualizar el autor"
        });
    }

};

// DELETE /authors/
const deleteauthor = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM authors WHERE id = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                msg: `El autor con id ${id} no fue encontrado`
            });
        }

        res.status(200).json({
            msg: "Autor eliminado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {

        console.error("Error al eliminar autor:", error);

        // Autor tiene posts o comentarios relacionados
        if (error.code === "23503") {
            return res.status(409).json({
                msg: "No se puede eliminar el autor porque tiene registros asociados"
            });
        }

        res.status(500).json({
            msg: "Error al eliminar el autor"
        });
    }
};

module.exports = {
    getlibrosController,
    getUserByIdlibrosController,
    postaddauthor,
    putactualizarauthor,
    deleteauthor
};