const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")

app.use(express.json())

//Import wszystkich ścieżek
const products = require("./routes/product")

app.use("/api/v1", products)

//Oprogramowanie pośredniczące do obsługi błędów
app.use(errorMiddleware) 

module.exports = app
