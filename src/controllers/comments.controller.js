//src/controllers/comments.controller.js
const { pool } = require("../config/dbConnect");

// POST /comments
const createComment = async (req, res) => {
    try {
        const { content, author_id, post_id } = req.body;

        const resultado = await pool.query(
            `INSERT INTO comments (content, author_id, post_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [content, author_id, post_id]
        );

        res.status(201).json({
            msg: "Comentario creado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al crear el comentario:", error);

        res.status(500).json({
            msg: "Error al crear el comentario"
        });
    }
};


// GET /comments
const getComments = async (req, res) => {
    try {

        const resultado = await pool.query(
            "SELECT * FROM comments ORDER BY id"
        );

        res.status(200).json({
            msg: "Comentarios encontrados",
            data: resultado.rows
        });

    } catch (error) {
        console.error("Error al obtener los comentarios:", error);

        res.status(500).json({
            msg: "Error al obtener los comentarios"
        });
    }
};


module.exports = {
    createComment,
    getComments
};