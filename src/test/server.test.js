const request = require("supertest");

const { app } = require("../server");

describe("Health Endpoint", () => {

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
    test("GET /authors devuelve todos los autores", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("GET /authors/1 devuelve un autor", async () => {
        const response = await request(app).get("/authors/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
    test("GET /authors/abc devuelve 400", async () => {
        const response = await request(app).get("/authors/abc");

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Ingrece ID valido");
    });
    test("GET /authors/999 devuelve 404", async () => {
        const response = await request(app).get("/authors/999");

        expect(response.status).toBe(404);
    });
    test("POST /authors crea un autor", async () => {
        const nuevoAutor = {
            id: 100,
            name: "Juan Pérez",
            email: "juan@gmail.com",
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

    test("GET /authors", async () => {

        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);

    });

    test("GET /authors/1", async () => {

        const response = await request(app).get("/authors/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

    });

    test("GET /authors/abc", async () => {

        const response = await request(app).get("/authors/abc");

        expect(response.status).toBe(400);

    });

    test("GET /authors/999", async () => {

        const response = await request(app).get("/authors/999");

        expect(response.status).toBe(404);

    });
    /*cuando es uno se coloca npm test , cuando son varios se coloca :npm run test:coverage */

});