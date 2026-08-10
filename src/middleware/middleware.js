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

const validateCommentData = (req, res, next) => {

    const {
        content,
        author_id,
        post_id
    } = req.body;

    const camposFaltantes = [];

    // Verificar campos obligatorios
    if (!content) camposFaltantes.push("content");
    if (!author_id) camposFaltantes.push("author_id");
    if (!post_id) camposFaltantes.push("post_id");

    // Verificar campos faltantes
    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            msg: "No se pudo crear el comentario, falta información",
            data: `Campos faltantes: ${camposFaltantes.join(", ")}`
        });
    }

    // Verificar que content sea texto y no solo espacios
    if (typeof content !== "string" || content.trim() === "") {
        return res.status(400).json({
            msg: "El contenido del comentario no puede estar vacío"
        });
    }

    // Verificar author_id
    if (
        !Number.isInteger(Number(author_id)) ||
        Number(author_id) <= 0
    ) {
        return res.status(400).json({
            msg: "El author_id debe ser un número entero positivo"
        });
    }

    // Verificar post_id
    if (
        !Number.isInteger(Number(post_id)) ||
        Number(post_id) <= 0
    ) {
        return res.status(400).json({
            msg: "El post_id debe ser un número entero positivo"
        });
    }

    next();
};
module.exports = {
requestLogger,
validateAuthorsData,
validateposteoData,
validarId,
validarAuthorId,
validateCommentData
};