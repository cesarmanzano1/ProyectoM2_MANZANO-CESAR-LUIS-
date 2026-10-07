// src/middleware/middleware.js

const validateAuthorsData = (req, res, next) => {

    const { name, email, bio } = req.body;

    const camposFaltantes = ["name", "email", "bio"]
        .filter(campo => req.body[campo] == undefined);

    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            msg: "No se pudo crear el autor, falta información",
            data: `Campos faltantes: ${camposFaltantes.join(", ")}`
        });
    }
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            msg: "El nombre debe ser un texto y no puede estar vacío"
        });
    }
    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({
            msg: "El email debe ser un texto y no puede estar vacío"
        });
    }

    if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        return res.status(400).json({
            msg: "El correo electrónico no es válido"
        });
    }
    if (typeof bio !== "string" || bio.trim() === "") {
        return res.status(400).json({
            msg: "La biografía debe ser un texto y no puede estar vacía"
        });
    }

    next();

};



const validateposteoData = (req, res, next) => {

    const {
        author_id,
        title,
        content,
        published
    } = req.body;

    // =========================
    // CAMPOS FALTANTES
    // =========================

    const camposFaltantes = [];

    if (author_id === undefined) {
        camposFaltantes.push("author_id");
    }

    if (title === undefined) {
        camposFaltantes.push("title");
    }

    if (content === undefined) {
        camposFaltantes.push("content");
    }

    if (published === undefined) {
        camposFaltantes.push("published");
    }

    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            msg: "No se pudo crear el posteo, falta información",
            data: `Campos faltantes: ${camposFaltantes.join(", ")}`
        });
    }


    // =========================
    // VALIDAR author_id
    // =========================

    if (
        typeof author_id !== "number" ||
        !Number.isInteger(author_id) ||
        author_id <= 0
    ) {
        return res.status(400).json({
            msg: "El author_id debe ser un número entero válido"
        });
    }


    // =========================
    // VALIDAR title
    // =========================

    if (
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        return res.status(400).json({
            msg: "El título no puede estar vacío"
        });
    }


    // =========================
    // VALIDAR content
    // =========================

    if (
        typeof content !== "string" ||
        content.trim() === ""
    ) {
        return res.status(400).json({
            msg: "El contenido no puede estar vacío"
        });
    }


    // =========================
    // VALIDAR published
    // =========================

    if (typeof published !== "boolean") {
        return res.status(400).json({
            msg: "El campo published debe ser true o false"
        });
    }


    next();
};



const validarId = (req, res, next) => {

    const { id } = req.params;


    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            msg: "Ingrese un ID válido"
        });
    }

    next();

};

const validarAuthorId = (req, res, next) => {

    const { authorId } = req.params;

    if (
        !authorId ||
        !Number.isInteger(Number(authorId)) ||
        Number(authorId) <= 0
    ) {
        return res.status(400).json({
            msg: "Ingrese un ID de autor válido"
        });
    }

    next();

};

const requestLogger = (req, res, next) => {

    console.log(`${req.method} ${req.originalUrl}`);

    next();

};

const errorHandler = (err, req, res, next) => {

    console.error(err);

    if (err.code === "23505") {
        return res.status(400).json({
            msg: "El dato ya existe"
        });
    }

    if (err.code === "23503") {
        return res.status(400).json({
            msg: "La relación indicada no existe"
        });
    }

    return res.status(500).json({
        msg: "Error interno del servidor"
    });
};

module.exports = {
    requestLogger,
    validateAuthorsData,
    validateposteoData,
    validarId,
    validarAuthorId,
    errorHandler,
};