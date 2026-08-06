// ..src/middleware/middleware.js

const validateAuthorsData = (req, res, next) => {
    const { name, email, bio } = req.body;

    const labels = ['name', 'email', 'bio'];

    const filtroCamposFaltantes = labels.filter(campo => !req.body[campo]);

    if (filtroCamposFaltantes.length > 0) {
        return res.status(400).json({
            msg: 'No se pudo crear el autor, falta información',
            data: `Campos faltantes ${filtroCamposFaltantes.join(', ')}`
        });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({
            msg: 'El correo electrónico no es válido'
        });
    }

    next();
}


const validateposteoData = (req, res, next) => {
    const { author_id,title,content,published,created_at} = req.body 

    if(!author_id || !title   || !content || !published || !created_at){
      return res.status(400).json({
        msg: 'no se pudo crear el posteo, falta informacion'
      })
    }
    next()
}

const validarId = (req, res, next) => {
    const { id} = req.params; 

    if(!id || isNaN(Number(id)) ){
      return res.status(400).json({
        msg: 'Ingrece ID valido'
      })
    }
    next()
}


const validarAuthorId = (req, res, next) => {
    const { authorId } = req.params;

    if (!authorId || isNaN(Number(authorId))) {
        return res.status(400).json({
            msg: "Ingrese un ID de autor valido válido"
        });
    }

    next();
};
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next()
}

 module.exports = {
   requestLogger,
    validateAuthorsData,
    validateposteoData,
    validarId,
    validarAuthorId
  
}

