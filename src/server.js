const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API funcionando correctamente"
    })
})

app.use(requestLogger)

app.use(express.json())

app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(router)

module.exports = {
    app
}