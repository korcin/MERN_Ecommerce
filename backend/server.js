const app = require("./app")
const connectDatabase = require("./config/database")

const dotenv = require("dotenv")

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

const server = app.listen(process.env.PORT, () => {
	console.log(
		`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	)
})

//Obsługa odrzuceń połączenia
process.on("unhandledRejection", err => {
	console.log(`ERROR: ${err.message}`)
	console.log("Wyłączenie serwera z powodu odrzucenia połaczenia.")
	server.close(() => {
		process.exit(1)
	})
})
