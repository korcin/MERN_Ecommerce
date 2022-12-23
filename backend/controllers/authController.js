const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const { send } = require("process")

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

// Zapomniane hasło => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		return next(
			new ErrorHandler("Nie znaleziono użytkownika z takim emailem.", 404)
		)
	}

	// Token resetu
	const resetToken = user.getResetPasswordToken()

	await user.save({ validateBeforeSave: false })

	// Stwórz url resetowanego hasła
	const resetUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/password/reset/${resetToken}`

	const message = `Twój token resetu hasła jest następujący:\n\n${resetUrl}\n\nJeśli nie prosiłeś/aś o ten e-mail, zignoruj go`

	try {
		await sendEmail({
			email: user.email,
			subject: "Odzyskiwanie hasła",
			message,
		})

		res.status(200).json({
			success: true,
			message: `Wysłano email do: ${user.email}`,
		})
	} catch (error) {
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save({ validateBeforeSave: false })

		return next(new ErrorHandler(error.message, 500))
	}
})

// Resetowanie hasła => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex")

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	})

	if (!user) {
		return next(
			new ErrorHandler(
				"Token odzyskiwania hasła jest nieprawidłowy albo wygasł.",
				400
			)
		)
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Hasło nie pasuje.", 400))
	}

	// Ustawianie nowego hasła
	user.password = req.body.password

	user.resetPasswordToken = undefined
	user.resetPasswordExpire = undefined

	await user.save()
	sendToken(user, 200, res)
})

// Wyświetl dane aktualnie zalogowanego użytkownika => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id)

	res.status(200).json({
		success: true,
		user,
	})
})

// Aktualizowanie / Zmiana hasła => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password")

	// Sprawdź poprzednie hasło użytkownika
	const isMatched = await user.comparePassword(req.body.oldPassword)
	if (!isMatched) {
		return next(new ErrorHandler("Stare hasło jest niepoprawne.", 400))
	}

	user.password = req.body.password
	await user.save()

	sendToken(user, 200, res)
})

// Zaktualizuj profil użytkownika => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	}

	// Aktualizacja avatara profilu
	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	})
	res.status(200).json({
		success: true,
	})
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
