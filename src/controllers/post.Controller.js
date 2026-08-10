// src/controllers/post.controller.js

const { pool } = require("../config/dbConnect");

// GET /posts
const getPostController = async (req, res) => {

try {

    const resultado = await pool.query(
        "SELECT * FROM posts ORDER BY id"
    );

    res.status(200).json({
        msg: "Posteos encontrados",
        data: resultado.rows
    });

} catch (error) {

    console.error("Error al obtener los posts:", error);

    res.status(500).json({
        msg: "Error al obtener los posts"
    });
}

};

// GET /posts/
const getByIspostsController = async (req, res) => {

try {

    const { id } = req.params;

    const resultado = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            msg: "Posteo no encontrado"
        });
    }

    res.status(200).json({
        msg: "Posteo encontrado",
        data: resultado.rows[0]
    });

} catch (error) {

    console.error("Error al obtener el post:", error);

    res.status(500).json({
        msg: "Error al obtener el post"
    });
}

};

// GET /posts/author/
const getPostsByAuthorController = async (req, res) => {

try {

    const { authorId } = req.params;

    // Primero verificamos que exista el autor
    const autor = await pool.query(
        "SELECT * FROM authors WHERE id = $1",
        [authorId]
    );

    if (autor.rows.length === 0) {
        return res.status(404).json({
            msg: "Autor no encontrado"
        });
    }

    // Buscamos los posts de ese autor
    const posts = await pool.query(
        "SELECT * FROM posts WHERE author_id = $1 ORDER BY id",
        [authorId]
    );

    res.status(200).json({
        msg: "Posts del autor",
        author: autor.rows[0],
        posts: posts.rows
    });

} catch (error) {

    console.error("Error al obtener los posts del autor:", error);

    res.status(500).json({
        msg: "Error al obtener los posts del autor"
    });
}

};

// POST /posts
const posPosteo = async (req, res) => {

try {

    const {
        author_id,
        title,
        content,
        published
    } = req.body;

    const resultado = await pool.query(
        `INSERT INTO posts
            (author_id, title, content, published)
         VALUES
            ($1, $2, $3, $4)
         RETURNING *`,
        [author_id, title, content, published]
    );

    res.status(201).json({
        msg: "Posteo agregado correctamente",
        data: resultado.rows[0]
    });

} catch (error) {

    console.error("Error al crear el post:", error);

    res.status(500).json({
        msg: "Error al crear el post"
    });
}

};

// PUT /posts/
const putactualizarpost = async (req, res) => {

try {

    const { id } = req.params;

    const {
        author_id,
        title,
        content,
        published
    } = req.body;

    const resultado = await pool.query(
        `UPDATE posts
         SET author_id = $1,
             title = $2,
             content = $3,
             published = $4
         WHERE id = $5
         RETURNING *`,
        [author_id, title, content, published, id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            msg: `El posteo con id ${id} no fue encontrado`
        });
    }

    res.status(200).json({
        msg: "El posteo fue actualizado correctamente",
        data: resultado.rows[0]
    });

} catch (error) {

    console.error("Error al actualizar el post:", error);

    res.status(500).json({
        msg: "Error al actualizar el post"
    });
}

};

// DELETE /posts/
const deletepost = async (req, res) => {

try {

    const { id } = req.params;

    const resultado = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            msg: `El posteo con id ${id} no fue encontrado`
        });
    }

    res.status(200).json({
        msg: "Posteo eliminado correctamente",
        data: resultado.rows[0]
    });

} catch (error) {

    console.error("Error al eliminar el post:", error);

    res.status(500).json({
        msg: "Error al eliminar el post"
    });
}

};

module.exports = {
getPostController,
getByIspostsController,
getPostsByAuthorController,
posPosteo,
putactualizarpost,
deletepost
};