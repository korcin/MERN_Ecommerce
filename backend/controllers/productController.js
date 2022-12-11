const Product = require("../models/product")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")

//Stwórz nowy produkt => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.create(req.body)

	res.status(201).json({
		success: true,
		product,
	})
})

//Wyświetl wszystkie produkty => /api/v1/products?keywords=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()

	const products = await apiFeatures.query

	res.status(200).json({
		success: true,
		count: products.length,
		products,
	})
})

//Wyświetl szczegóły jednego produktu => /api/v1/product/:id
exports.getSigleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id)
	if (!product) {
		return next(new ErrorHandler("Nie znaleziono produktu.", 404))
	}

	res.status(200).json({
		success: true,
		product,
	})
})

//Zaktualizuj produkt => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id)
	if (!product) {
		return next(new ErrorHandler("Nie znaleziono produktu.", 404))
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})

	res.status(200).json({
		success: true,
		product,
	})
})

//Usuń produkt => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id)
	if (!product) {
		return next(new ErrorHandler("Nie znaleziono produktu.", 404))
	}

	await product.remove()
	res.status(200).json({
		success: true,
		message: "Produkt został usunięty.",
	})
})
