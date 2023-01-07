const app = require("./app")
const connectDatabase = require("./config/database")

const dotenv = require("dotenv")
const cloudinary = require("cloudinary")

//Obługa niepoprawnych wyjątków
process.on("uncaughtException", err => {
	console.log(`ERROR: ${err.stack}`)
	console.log("Wyłączenie serwera z powodu niepoprawnego wyjątku.")
	process.exit(1)
})

//Ustawianie pliku config
dotenv.config({ path: "backend/config/config.env" })

//Łączenie z bazą
connectDatabase()

// Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
	console.log(
		`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	)
})

//Obsługa odrzuceń połączenia
process.on("unhandledRejection", err => {
	console.log(`ERROR: ${err.stack}`)
	console.log("Wyłączenie serwera z powodu odrzucenia połaczenia.")
	server.close(() => {
		process.exit(1)
	})
})
