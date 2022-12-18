const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")

//Rejestracja użytkownika => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "avatars/avatar1_e19tqg",
			url: "https://res.cloudinary.com/dn4sa6fc2/image/upload/v1671105140/avatars/avatar1_e19tqg.jpg",
		},
	})

	const token = user.getJwtToken()

	res.status(201).json({
		success: true,
		token,
	})

	sendToken(user, 200, res)
})

//Logowanie użytkownika => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body

	//Sprawdź czy email i hasło zostało podane przez użytkownika
	if (!email || !password) {
		return next(new ErrorHandler("Proszę podać email i hasło.", 400))
	}

	//Znajdowanie użytkownika w bazie danych
	const user = await User.findOne({ email }).select("+password")

	if (!user) {
		return next(new ErrorHandler("Niepoprawny email lub hasło.", 401))
	}

	//Sprawdzanie czy hasło jest poprawne
	const isPasswordMatched = await user.comparePassword(password)

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Niepoprawny email lub hasło.", 401))
	}

	sendToken(user, 200, res)
})

// Wylogowywanie użytkownika => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	})

	res.status(200).json({
		success: true,
		message: "Pomyślnie wylogowano.",
	})
})
