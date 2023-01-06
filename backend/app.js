const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cloudinary = require("cloudinary")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Import wszystkich ścieżek
const products = require("./routes/product")
const auth = require("./routes/auth")
const order = require("./routes/order")

app.use("/api/v1", products)
app.use("/api/v1", auth)
app.use("/api/v1", order)

//Oprogramowanie pośredniczące do obsługi błędów
app.use(errorMiddleware)

module.exports = app
