const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

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
})
