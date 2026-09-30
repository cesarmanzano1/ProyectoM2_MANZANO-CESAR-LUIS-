const postService = require("../services/post.service");
const authorsService = require("../services/authors.service");

// GET /posts
const getPostController = async (req, res) => {
      try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            msg: "Posteos encontrados",
            data: posts
        });
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ msg: "Error al obtener los posts" });
    }};

// GET /posts/:id
const getByIspostsController = async (req, res) => {
try {
        const { id } = req.params;
        const post = await postService.getPostById(id);

        if (!post) {
            return res.status(404).json({ msg: "Posteo no encontrado" });
        }

        res.status(200).json({
            msg: "Posteo encontrado",
            data: post
        });
     } catch (error) {
        console.error("Error al obtener el post:", error);
        res.status(500).json({ msg: "Error al obtener el post" });
     }};

// GET /posts/author/:authorId
const getPostsByAuthorController = async (req, res) => {
       try {
        const { authorId } = req.params;

        // Verificar que el autor existe antes de buscar sus posts
        const autor = await authorsService.getAuthorById(authorId);
        if (!autor) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        const posts = await postService.getPostsByAuthorId(authorId);

        res.status(200).json({
            msg: "Posts del autor",
            author: autor,
            posts: posts
        });
       } catch (error) {
        console.error("Error al obtener los posts del autor:", error);
        res.status(500).json({ msg: "Error al obtener los posts del autor" });
    }};

// POST /posts
const posPosteo = async (req, res) => {
    try {
        const nuevoPost = await postService.createPost(req.body);

        return res.status(201).json({
            msg: "Posteo agregado correctamente",
            data: nuevoPost        });
    } catch (error) {
        console.error("Error al crear el post:", error);
        if (error.code === "23503") {
            return res.status(400).json({ msg: "El author_id proporcionado no existe" });
        }
        return res.status(500).json({ msg: "Error al crear el post" });
    }};

// PUT /posts/:id
const putactualizarpost = async (req, res) => {
    try {
        const { id } = req.params;
        const postActualizado = await postService.updatePost(id, req.body);

        if (!postActualizado) {
            return res.status(404).json({ msg: `El posteo con id ${id} no fue encontrado` });
        }

        return res.status(200).json({
            msg: "El posteo fue actualizado correctamente",
            data: postActualizado
        });
       } catch (error) {
        console.error("Error al actualizar el post:", error);
        if (error.code === "23503") {
            return res.status(400).json({ msg: "El author_id proporcionado no existe" });
        }
        return res.status(500).json({ msg: "Error al actualizar el post" });
    }
};

// DELETE /posts/:id
const deletepost = async (req, res) => {
  try {
        const { id } = req.params;
        const postEliminado = await postService.deletePost(id);

        if (!postEliminado) {
            return res.status(404).json({ msg: `El posteo con id ${id} no fue encontrado` });
        }

        res.status(200).json({
            msg: "Posteo eliminado correctamente",
            data: postEliminado
        });
     } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).json({ msg: "Error al eliminar el post" });
    }};

module.exports = {
    getPostController,
    getByIspostsController,
    getPostsByAuthorController,
    posPosteo,
    putactualizarpost,
    deletepost
};