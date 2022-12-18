const jwt = require("jsonwebtoken")
const user = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("./catchAsyncErrors")

// Sprawdź czy użytkownik jest potwierdzony czy nie
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies

	if (!token) {
		return next(
			new ErrorHandler("Proszę się zalogować by uzyskać dostęp.", 401)
		)
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	req.user = await user.findById(decoded.id)

	next()
})

// Sprawdzanie roli użytkowników
exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`(${req.user.role}) nie ma pozwolenia do wykonywania tej czynności.`,
					403
				)
			)
		}
		next()
	}
}
