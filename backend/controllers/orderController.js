const Order = require("../models/order")
const Procudt = require("../models/product")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

// Stwórz nowe zamówienie => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id,
	})

	res.status(200).json({
		success: true,
		order,
	})
})

// Znajdź pojedyncze zamówienie => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	)

	if (!order) {
		return next(new ErrorHandler("Nie znaleziono takiego zamówienia.", 400))
	}

	res.status(200).json({
		success: true,
		order,
	})
})

// Znajdź zamówienia zalogowanego użytkownika => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id })

	res.status(200).json({
		success: true,
		orders,
	})
})

// Znajdź wszystkie zamówienia => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find()

	let totalAmount = 0
	orders.forEach(order => {
		totalAmount += order.totalPrice
	})

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	})
})
