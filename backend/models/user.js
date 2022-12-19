const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Proszę podać nazwę."],
		maxLength: [30, "Nazwa nie może przekraczać 30 znaków."],
	},
	email: {
		type: String,
		required: [true, "Prosze podać e-mail."],
		unique: true,
		validator: [validator.isEmail, "Proszę podać poprawny adres e-mail"],
	},
	password: {
		type: String,
		required: true,
		minlength: [8, "Hasło musi być dłuższe niż 8 znaków."],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
})

//Szyfrowanie hasła przed zapisaniem użytkownika
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next()
	}

	this.password = await bcrypt.hash(this.password, 10)
})

//Porównaj hasło użytkownika
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

//Zwróć JWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	})
}

// Generowanie tokenu resetowania hasła
userSchema.methods.getResetPasswordToken = function () {
	// Generowanie tokenu
	const resetToken = crypto.randomBytes(20).toString("hex")

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex")

	// Czas trwania tokenu
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

	return resetToken
}

module.exports = mongoose.model("User", userSchema)
