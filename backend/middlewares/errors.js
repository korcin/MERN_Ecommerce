const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errMessage: err.message,
			stack: err.stack,
		})
	}

	if (process.env.NODE_ENV === "PRODUCTION") {
		let error = { ...err }

		error.message = err.message

		//Niepoprawne Mongoose Object ID
		if (err.name === "CastError") {
			const message = `Źródło nie znalezione. Niepoprawne ${err.path}.`
			error = new ErrorHandler(message, 400)
		}

		//Obługa niepoprawnej walidacji Mongoose
		if (err.name === "ValidationError") {
			const message = Object.values(err.errors).map(value => value.message)
			error = new ErrorHandler(message, 400)
		}

		// Mongoose duplikaty
		if (err.code === 11000) {
			const message = `Zduplikowany ${Object.keys(err.keyValue)}`
			error = new ErrorHandler(message, 400)
		}

		// Błędy JWT
		if (err.name === "JsonWebTokenError") {
			const message = "JSON Web Token jest nieprawidłowy. Sporóbuj ponownie."
			error = new ErrorHandler(message, 400)
		}

		// Przestarzały JWT
		if (err.name === "TokenExpiredError") {
			const message = "JSON Web Token wygasł. Sporóbuj ponownie."
			error = new ErrorHandler(message, 400)
		}

		res.status(err.statusCode).json({
			success: false,
			message: error.message || "Wewnętrzny Błąd Serwera",
		})
	}
}
