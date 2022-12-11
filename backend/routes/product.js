const express = require("express")
const router = express.Router()

const {
	getProducts,
	newProduct,
	getSigleProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController")

router.route("/products").get(getProducts)
router.route("/product/:id").get(getSigleProduct)

router.route("/admin/product/new").post(newProduct)
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct)

module.exports = router
