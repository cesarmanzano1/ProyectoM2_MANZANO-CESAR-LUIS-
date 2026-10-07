//src/controllers/authors.Controller.js 
const authorsService = require("../services/authors.service");

// GET /authors
const getlibrosController = async (req, res) => {
    try {
        const autores = await authorsService.getAllAuthors();
        res.status(200).json({
            msg: "Autores encontrados",
            data: autores
        });
    } catch (error) {
        console.error("Error al obtener autores:", error);
        res.status(500).json({ msg: "Error al obtener los autores" });
    }
};

// GET /authors/:id
const getUserByIdlibrosController = async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await authorsService.getAuthorById(id);

        if (!autor) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        res.status(200).json({
            msg: "Autor encontrado",
            data: autor
        });
    } catch (error) {
        console.error("Error al obtener el autor:", error);
        res.status(500).json({ msg: "Error al obtener el autor" });
    }
};

// POST /authors
const postaddauthor = async (req, res) => {
    try {
        const autorCreado = await authorsService.createAuthor(req.body);
        res.status(201).json({
            msg: "Autor agregado correctamente",
            data: autorCreado
        });
    } catch (error) {
        console.error("Error al crear el autor:", error); if (error.code === "23505") {
            return res.status(400).json({ msg: "El correo electrónico ya está registrado" });
        }
        res.status(500).json({ msg: "Error al crear el autor" });
    }
};

// PUT /authors/:id
const putactualizarauthor = async (req, res) => {
    try {
        const { id } = req.params;
        const autorActualizado = await authorsService.updateAuthor(id, req.body);

        if (!autorActualizado) {
            return res.status(404).json({ msg: `El autor con id ${id} no fue encontrado` });
        }

        res.status(200).json({
            msg: "Autor actualizado correctamente",
            data: autorActualizado
        });
    } catch (error) {
        console.error("Error al actualizar el autor:", error);
        if (error.code === "23505") {
            return res.status(400).json({ msg: "El correo electrónico ya está registrado" });
        }
        res.status(500).json({ msg: "Error al actualizar el autor" });
    }
};

// DELETE /authors/:id
const deleteauthor = async (req, res) => {
    try {
        const { id } = req.params;
        const autorEliminado = await authorsService.deleteAuthor(id);

        if (!autorEliminado) {
            return res.status(404).json({ msg: `El autor con id ${id} no fue encontrado` });
        }

        return res.status(200).json({ msg: "Autor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar autor:", error);


        res.status(500).json({ msg: "Error al eliminar el autor" });
    }
};

module.exports = {
    getlibrosController,
    getUserByIdlibrosController,
    postaddauthor,
    putactualizarauthor,
    deleteauthor
};