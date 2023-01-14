import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import {
	productsReducer,
	productDetailsReducer,
	newReviewReducer,
	newProductReducer,
	productReducer,
} from "./reducers/productReducers"

import {
	authReducer,
	userReducer,
	forgotPasswordReducer,
	allUsersReducer,
} from "./reducers/userReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
	newOrderReducer,
	myOrdersReducer,
	orderDetailsReducer,
	allOrdersReducer,
	orderReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
	products: productsReducer,
	newProduct: newProductReducer,
	productDetails: productDetailsReducer,
	auth: authReducer,
	user: userReducer,
	allUsers: allUsersReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	orderDetails: orderDetailsReducer,
	newReview: newReviewReducer,
	product: productReducer,
	allOrders: allOrdersReducer,
	order: orderReducer,
})

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
}

const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
