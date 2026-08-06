// ..src/controllers/authors.Controller.js


const { baseDeDatos } = require("../services/libros")

const getlibrosController = (req, res) => {

    const autor = baseDeDatos.authors//muestra los authors

    res.status(200).json({
        msg: "Autores  encontrados",
        data: autor
    })
}

const getUserByIdlibrosController = (req, res) => {

    const { id } = req.params;

    const autor = baseDeDatos.authors.find(
        (author) => author.id === Number(id)
    );

    if (!autor) {
        return res.status(404).json({
            msg: "Autor no encontrado"
        });
    }

    res.status(200).json({
        msg: "Autor encontrado",
        data: autor
    });
};

const postaddauthor = (req, res) => {
    let autorNuevo = req.body;
    baseDeDatos.authors.push(autorNuevo);

    res.status(201).json({
        msg: "Autor agregado correctamente",
        data: autorNuevo
    });

};
const putactualizarauthor = (req, res) => {
    const authorctualizado = req.body;
    const { id } = req.params;
    const indice = baseDeDatos.authors.findIndex((author) => author.id === Number(id));

    if (indice >= 0) {
        baseDeDatos.authors[indice] = authorctualizado;

    } else {
        return res.status(204).send(`El curso con id ${id} no fue encontrado.`);
    }

    res.status(201).json({
        msg: "Autor actualizado correctamente",
        data: authorctualizado
    });

};

const deleteauthor = (req, res) => {
    const { id } = req.params;
    const indice = baseDeDatos.authors.findIndex((author) => author.id === Number(id));

    if (indice === -1) {
        return res.status(204).send(`El curso con id ${id} no fue encontrado.`);

    } 
    const autorEliminado = baseDeDatos.authors.splice(indice, 1);

    res.status(201).json({
        msg: "Autor eliminado correctamente",
        data: autorEliminado
    });

};

module.exports = {
    getlibrosController,
    getUserByIdlibrosController,
    postaddauthor,
    putactualizarauthor,
    deleteauthor
}