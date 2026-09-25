//src/test/server.test.js
const request = require("supertest");

const { app } = require("../server");

describe("Health Endpoint", () => {

    // =========================
    // HEALTH Y SWAGGER
    // =========================

    test("GET /api-docs.json devuelve la especificación Swagger", async () => {

        const response = await request(app).get("/api-docs.json");

        expect(response.status).toBe(200);
        expect(response.body.openapi).toBe("3.0.0");

    });


    test("GET /health debe responder 200", async () => {

        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");

    });


    // =========================
    // AUTHORS
    // =========================

    test("GET /authors devuelve todos los autores", async () => {

        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);

    });




    test("GET /authors/999 devuelve 404", async () => {

        const response = await request(app).get("/authors/999");

        expect(response.status).toBe(404);

    });


    test("POST /authors crea un autor", async () => {

        const nuevoAutor = {
            name: "Juan Pérez",
            email: `juan.${Date.now()}@gmail.com`,
            bio: "Programador"
        };

        const response = await request(app)
            .post("/authors")
            .send(nuevoAutor);

        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe("Juan Pérez");

    });


    test("POST /authors sin email devuelve 400", async () => {

        const response = await request(app)
            .post("/authors")
            .send({
                name: "Juan",
                bio: "Programador"
            });

        expect(response.status).toBe(400);

    });
    test("POST /authors con email inválido devuelve 400", async () => {

        const response = await request(app)
            .post("/authors")
            .send({
                name: "Juan",
                email: "email-invalido",
                bio: "Programador"
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("El correo electrónico no es válido");

    });
    test("POST /authors con email repetido devuelve 400", async () => {

        const email = `repetido.${Date.now()}@gmail.com`;

        const nuevoAutor = {
            name: "Autor Original",
            email: email,
            bio: "Primer autor"
        };

        // Primero creamos el autor
        const primerAutor = await request(app)
            .post("/authors")
            .send(nuevoAutor);

        expect(primerAutor.status).toBe(201);

        // Intentamos crear otro autor con el mismo email
        const segundoAutor = await request(app)
            .post("/authors")
            .send({
                name: "Autor Duplicado",
                email: email,
                bio: "Segundo autor"
            });

        expect(segundoAutor.status).toBe(400);
        expect(segundoAutor.body.msg).toBe(
            "El correo electrónico ya está registrado"
        );

    });
    test("PUT /authors/:id actualiza un autor", async () => {

        // Creamos un autor para asegurarnos de tener un ID válido
        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor Original",
                email: `autor.put.${Date.now()}@gmail.com`,
                bio: "Bio original"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        const response = await request(app)
            .put(`/authors/${authorId}`)
            .send({
                name: "Autor Actualizado",
                email: `autor.actualizado.${Date.now()}@gmail.com`,
                bio: "Bio actualizada"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(authorId);
        expect(response.body.data.name).toBe("Autor Actualizado");
        expect(response.body.data.bio).toBe("Bio actualizada");
    });
    test("PUT /authors/:id con email inválido devuelve 400", async () => {

        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor Email",
                email: `autor.email.${Date.now()}@gmail.com`,
                bio: "Bio"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        const response = await request(app)
            .put(`/authors/${authorId}`)
            .send({
                name: "Autor Modificado",
                email: "email-invalido",
                bio: "Bio modificada"
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("El correo electrónico no es válido");
    });
    test("PUT /authors/abc devuelve 400", async () => {

        const response = await request(app)
            .put("/authors/abc")
            .send({
                name: "Autor",
                email: "autor@gmail.com",
                bio: "Bio"
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID válido");
    });
    test("PUT /authors/999 devuelve 404", async () => {

        const response = await request(app)
            .put("/authors/999")
            .send({
                name: "Autor",
                email: "autor999@gmail.com",
                bio: "Bio"
            });

        expect(response.status).toBe(404);
    });
    test("DELETE /authors/:id elimina un autor", async () => {

        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor para eliminar",
                email: `autor.delete.${Date.now()}@gmail.com`,
                bio: "Autor de prueba"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        const response = await request(app)
            .delete(`/authors/${authorId}`);

        expect([200, 204]).toContain(response.status);
    });
    test("DELETE /authors/999 devuelve 404", async () => {

        const response = await request(app)
            .delete("/authors/999");

        expect(response.status).toBe(404);
    });
    test("DELETE /authors/abc devuelve 400", async () => {

        const response = await request(app)
            .delete("/authors/abc");

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID válido");
    });
    // POSTS
    // =========================
    test("PUT /posts/:id actualiza un post", async () => {

        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor para actualizar post",
                email: `autor.post.put.${Date.now()}@gmail.com`,
                bio: "Autor de prueba"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        const post = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Post original",
                content: "Contenido original",
                published: false
            });

        expect(post.status).toBe(201);

        const postId = post.body.data.id;

        const response = await request(app)
            .put(`/posts/${postId}`)
            .send({
                author_id: authorId,
                title: "Post actualizado",
                content: "Contenido actualizado",
                published: true
            });

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(postId);
        expect(response.body.data.title).toBe("Post actualizado");
        expect(response.body.data.content).toBe("Contenido actualizado");
        expect(response.body.data.published).toBe(true);
    });
    test("GET /posts devuelve todos los posts", async () => {

        const response = await request(app).get("/posts");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);

    });


    test("GET /posts/999 devuelve 404", async () => {

        const response = await request(app).get("/posts/999");

        expect(response.status).toBe(404);

    });


    test("GET /posts/abc devuelve 400", async () => {

        const response = await request(app).get("/posts/abc");

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID válido");

    });


    test("GET /posts/author/999 devuelve 404", async () => {

        const response = await request(app).get("/posts/author/999");

        expect(response.status).toBe(404);

    });


    test("GET /posts/author/abc devuelve 400", async () => {

        const response = await request(app).get("/posts/author/abc");

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID de autor válido");

    });


    test("POST /posts crea un post", async () => {

        // Primero creamos un autor para asegurarnos
        // de que exista una clave foránea válida
        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor para Post",
                email: `autor.post.${Date.now()}@gmail.com`,
                bio: "Autor utilizado para pruebas de posts"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        // Ahora creamos el post utilizando el ID real del autor
        const nuevoPost = {
            author_id: authorId,
            title: "Post de prueba",
            content: "Contenido del post de prueba",
            published: true
        };

        const response = await request(app)
            .post("/posts")
            .send(nuevoPost);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.title).toBe("Post de prueba");
        expect(response.body.data.author_id).toBe(authorId);

    });


    test("POST /posts sin title devuelve 400", async () => {

        const response = await request(app)
            .post("/posts")
            .send({
                author_id: 1,
                content: "Contenido de prueba",
                published: true
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "No se pudo crear el posteo, falta información"
        );

    });


    test("POST /posts sin content devuelve 400", async () => {

        const response = await request(app)
            .post("/posts")
            .send({
                author_id: 1,
                title: "Post sin contenido",
                published: true
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "No se pudo crear el posteo, falta información"
        );

    });


    test("POST /posts con published inválido devuelve 400", async () => {

        const response = await request(app)
            .post("/posts")
            .send({
                author_id: 1,
                title: "Post de prueba",
                content: "Contenido de prueba",
                published: "true"
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "No se pudo crear el posteo, falta información"
        );

    });


    test("PUT /posts/999 devuelve 404", async () => {

        const response = await request(app)
            .put("/posts/999")
            .send({
                author_id: 1,
                title: "Post actualizado",
                content: "Contenido actualizado",
                published: true
            });

        expect(response.status).toBe(404);

    });


    test("PUT /posts/abc devuelve 400", async () => {

        const response = await request(app)
            .put("/posts/abc")
            .send({
                author_id: 1,
                title: "Post actualizado",
                content: "Contenido actualizado",
                published: true
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID válido");

    });

    test("DELETE /posts/:id elimina un post", async () => {

        const autor = await request(app)
            .post("/authors")
            .send({
                name: "Autor para eliminar post",
                email: `autor.post.delete.${Date.now()}@gmail.com`,
                bio: "Autor de prueba"
            });

        expect(autor.status).toBe(201);

        const authorId = autor.body.data.id;

        const post = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Post para eliminar",
                content: "Contenido de prueba",
                published: true
            });

        expect(post.status).toBe(201);

        const postId = post.body.data.id;

        const response = await request(app)
            .delete(`/posts/${postId}`);

        expect([200, 204]).toContain(response.status);
    });
    test("DELETE /posts/999 devuelve 404", async () => {

        const response = await request(app)
            .delete("/posts/999");

        expect(response.status).toBe(404);

    });


    test("DELETE /posts/abc devuelve 400", async () => {

        const response = await request(app)
            .delete("/posts/abc");

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrese un ID válido");

    });
});