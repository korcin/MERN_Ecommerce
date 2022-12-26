const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Podaj nazwę produktu."],
		trim: true,
		maxLength: [100, "Nazwa nie może przekraczać 100 znaków."],
	},
	price: {
		type: Number,
		required: [true, "Podaj cenę produktu."],
		maxLength: [5, "Cena nie może przekraczać 5 znaków."],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, "Podaj opis produktu."],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Proszę wybrać kategorię dla produktu."],
		enum: {
			values: [
				"Podzespoły komputerowe",
				"Laptopy",
				"Komputery",
				"Telefony",
				"Aparaty",
				"Konsole",
				"Akcesoria",
			],
			message: "Proszę wybrać poprawną kategorię dla produktu.",
		},
	},
	seller: {
		type: String,
		required: [true, "Prosze podać sprzedawcę."],
	},
	stock: {
		type: Number,
		required: [true, "Proszę podać ilość dostępnego produku."],
		maxLength: [5, "Cena nie może przekraczać 5 znaków."],
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "Użytkownik",
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model("Product", productSchema)
