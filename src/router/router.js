/* src/ routers/router.js */

const { Router }  = require("express");
const { healthController } = require("../controllers/health.controller");

const { getlibrosController } = require("../controllers/authors.Controller");
const {getUserByIdlibrosController}=require("../controllers/authors.Controller");
const {postaddauthor}=require("../controllers/authors.Controller");
const {putactualizarauthor}=require("../controllers/authors.Controller");
const {deleteauthor}=require("../controllers/authors.Controller");

/******  POSTEOS ******************/
const { getPostController } = require("../controllers/post.Controller");
const { getByIspostsController } = require("../controllers/post.Controller");
const { getPostsByAuthorController } = require("../controllers/post.Controller");
const { posPosteo } = require("../controllers/post.Controller");
const { putactualizarpost } = require("../controllers/post.Controller");
const { deletepost } = require("../controllers/post.Controller");

/*****COMENTARIOS**************** */
const { createComment } = require("../controllers/comments.controller");
const { getComments } = require("../controllers/comments.controller");





/** MIDDLEWARE */

const { validateAuthorsData } = require("../middleware/middleware");
const { validateposteoData } = require("../middleware/middleware");
const { validarId } = require("../middleware/middleware");
const { validarAuthorId } = require("../middleware/middleware");
const { validateCommentData } = require("../middleware/middleware");








/******  AUTORES ******************/

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verificar estado del servicio
 *     responses:
 *       200:
 *         description: Servicio operativo
 */
router.get('/health',  healthController);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Obtener todos los autores
 *     responses:
 *       200:
 *         description: Lista de autores
 */
router.get('/authors',  getlibrosController);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Autor encontrado
 *       404:
 *         description: Autor no encontrado
 */
router.get('/authors/:id',validarId, getUserByIdlibrosController);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Crear un nuevo autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, bio]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor creado correctamente
 */
router.post('/authors',validateAuthorsData, postaddauthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Actualizar un autor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Autor actualizado correctamente
 */
router.put('/authors/:id',validarId, putactualizarauthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Autor eliminado correctamente
 */
router.delete('/authors/:id',validarId, deleteauthor);


/******  POSTEOS ******************/
/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/posts',  getPostController);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Obtener un post por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 */
router.get('/posts/:id',validarId, getByIspostsController);

/**
 * @openapi
 * /posts/author/{authorId}:
 *   get:
 *     summary: Obtener posts por autor
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Posts del autor
 */
router.get("/posts/author/:authorId",validarAuthorId, getPostsByAuthorController);

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [author_id, title, content, published]
 *             properties:
 *               author_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *               
 *     responses:
 *       201:
 *         description: Post creado correctamente
 */
router.post("/posts",validateposteoData, posPosteo);

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Post actualizado correctamente
 */
router.put('/posts/:id',validarId, putactualizarpost);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Post eliminado correctamente
 */
router.delete('/posts/:id',validarId, deletepost);

  
/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author_id
 *               - post_id
 *               - content
 *             properties:
 *               author_id:
 *                 type: integer
 *                 description: ID del autor que realiza el comentario
 *                 example: 1
 *               post_id:
 *                 type: integer
 *                 description: ID del post comentado
 *                 example: 1
 *               content:
 *                 type: string
 *                 description: Contenido del comentario
 *                 example: Excelente publicación
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *       400:
 *         description: Datos del comentario inválidos
 */
router.post("/comments", validateCommentData, createComment);


/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       404:
 *         description: No se encontraron comentarios
 */
router.get("/comments", getComments);
module.exports = {
  router
}


