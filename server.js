require("dotenv").config()
const cors = require("cors");
const express = require("express")
const mongoose = require("mongoose")

// crear server
const app = express()
const port = process.env.PORT || 3001

// conexion a la db
mongoose.connect(process.env.DATABASE_URL_CLOUD, {useNewUrlParser: true})
const db = mongoose.connection

// manejo de eventos
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Abriendo la base de datos..."))

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/tareas", require("./routes/tarea-routes"))

// iniciar server
app.listen(port, () => console.log("Server listening..."))