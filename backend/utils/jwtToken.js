// Stwórz i wyślij token i zapisz w cookies.
const sendToken = (user, statusCode, res) => {
	// Tworzenie tokenu JWT
	const token = user.getJwtToken()

	// Opcje dla cookie
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	}

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
		user,
	})
}

module.exports = sendToken
