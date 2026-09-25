// src/middleware/middleware.js

const validateAuthorsData = (req, res, next) => {

const { name, email, bio } = req.body;

const camposFaltantes = ["name", "email", "bio"]
    .filter(campo => !req.body[campo]);

if (camposFaltantes.length > 0) {
    return res.status(400).json({
        msg: "No se pudo crear el autor, falta información",
        data: `Campos faltantes: ${camposFaltantes.join(", ")}`
    });
}

if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
) {
    return res.status(400).json({
        msg: "El correo electrónico no es válido"
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

const camposFaltantes = [];

if (!author_id) camposFaltantes.push("author_id");
if (!title) camposFaltantes.push("title");
if (!content) camposFaltantes.push("content");

// published puede ser true o false.
// Por eso verificamos específicamente que sea boolean.
if (typeof published !== "boolean") {
    camposFaltantes.push("published");
}

if (camposFaltantes.length > 0) {
    return res.status(400).json({
        msg: "No se pudo crear el posteo, falta información",
        data: `Campos faltantes: ${camposFaltantes.join(", ")}`
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

module.exports = {
requestLogger,
validateAuthorsData,
validateposteoData,
validarId,
validarAuthorId,
};