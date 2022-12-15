const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
	ressetPasswordToken: String,
	resetPasswordExpire: Date,
})

//Szyfrowanie hasła przed zapisaniem użytkownika
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next()
	}

	this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("User", userSchema)
