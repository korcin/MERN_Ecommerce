const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

//Oprogramowanie pośredniczące do obsługi błędów
app.use(errorMiddleware)

//Ustawianie pliku config
dotenv.config({ path: "backend/config/config.env" })

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())
app.use(express.json({ limit: "50mb" }))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
)
app.use(cookieParser())
app.use(fileUpload())

//Import wszystkich ścieżek
const products = require("./routes/product")
const auth = require("./routes/auth")
const payment = require("./routes/payment")
const order = require("./routes/order")

app.use("/api/v1", products)
app.use("/api/v1", auth)
app.use("/api/v1", payment)
app.use("/api/v1", order)

module.exports = app
