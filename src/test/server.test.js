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


    // =========================
    // COMENTARIOS
    // =========================

    test("POST /comments sin content devuelve 400", async () => {

        const response = await request(app)
            .post("/comments")
            .send({
                author_id: 1,
                post_id: 1
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "No se pudo crear el comentario, falta información"
        );

    });


    test("POST /comments con content vacío devuelve 400", async () => {

        const response = await request(app)
            .post("/comments")
            .send({
                content: "   ",
                author_id: 1,
                post_id: 1
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "El contenido del comentario no puede estar vacío"
        );

    });


    test("POST /comments con author_id inválido devuelve 400", async () => {

        const response = await request(app)
            .post("/comments")
            .send({
                content: "Excelente publicación",
                author_id: "abc",
                post_id: 1
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "El author_id debe ser un número entero positivo"
        );

    });


    test("POST /comments con post_id inválido devuelve 400", async () => {

        const response = await request(app)
            .post("/comments")
            .send({
                content: "Excelente publicación",
                author_id: 1,
                post_id: "abc"
            });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe(
            "El post_id debe ser un número entero positivo"
        );

    });


    test("GET /comments devuelve todos los comentarios", async () => {

        const response = await request(app).get("/comments");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);

    });

});