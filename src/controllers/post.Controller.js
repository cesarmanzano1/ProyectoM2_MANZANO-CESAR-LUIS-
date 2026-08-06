
// ..src/controllers/post.controller.js


const { baseDeDatos } = require("../services/libros")

const getPostController = (req, res) => {

    const posteo = baseDeDatos.posts//muestra los posteos

    res.status(200).json({
        msg: "Posteos  encontrados",
        data: posteo
    })
}

const getByIspostsController = (req, res) => {

    const { id } = req.params;

    const posteo = baseDeDatos.posts.find((posteo) => posteo.id === Number(id));

    if (!posteo) {
        return res.status(404).json({
            msg: "Posteo no encontrado"
        });
    }

    res.status(200).json({
        msg: "Posteo encontrado",
        data: posteo
    });
};

const getPostsByAuthorController = (req, res) => {

    const { authorId } = req.params;

    const autor = baseDeDatos.authors.find( author => author.id === Number(authorId) );

    if (!autor) {
        return res.status(404).json({
            msg: "Autor no encontrado"
        });
    }

    const posts = baseDeDatos.posts.filter( post => post.author_id === Number(authorId) );

    res.status(200).json({
        msg: "Posts del autor",
        author: autor,
        posts: posts
    });
};


const posPosteo = (req, res) => {
    let posteoNuevo = req.body;
    baseDeDatos.posts.push(posteoNuevo);

    res.status(201).json({
        msg: "Autor agregado correctamente",
        data: posteoNuevo
    });

};

const putactualizarpost = (req, res) => {
    const postctualizado = req.body;
    const { id } = req.params;
    const indice = baseDeDatos.posts.findIndex((post) => post.id === Number(id));

    if (indice >= 0) {
        baseDeDatos.posts[indice] = postctualizado;

    } else {
        return res.status(204).send(`El posteo con id ${id} no fue encontrado.`);
    }

    res.status(201).json({
        msg: "El posteo fue actualizado correctamente",
        data: postctualizado
    });

};

const deletepost = (req, res) => {
    const { id } = req.params;
    const indice = baseDeDatos.posts.findIndex((post) => post.id === Number(id));

    if (indice === -1) {
        return res.status(204).send(`El poste con id ${id} no fue encontrado.`);

    } 
    const posteoEliminado = baseDeDatos.posts.splice(indice, 1);

    res.status(201).json({
        msg: "poste eliminado correctamente",
        data: posteoEliminado
    });

};

module.exports = {
    getPostController,
    getByIspostsController,
    getPostsByAuthorController,
    posPosteo,
    putactualizarpost,
    deletepost
    
}