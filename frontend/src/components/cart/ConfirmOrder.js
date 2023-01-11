import React, { Fragment } from "react"
import MetaData from "../layout/MetaData"
import CheckoutSteps from "./CheckoutSteps"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const ConfirmOrder = () => {
	const { cartItems, shippingInfo } = useSelector(state => state.cart)
	const { user } = useSelector(state => state.auth)

	const navigate = useNavigate()

	//   Obliczanie cen zamówienia
	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)
	const shippingPrice = itemsPrice < 5000 ? 5.99 : 0
	const totalPrice = (itemsPrice + shippingPrice).toFixed(2)

	const processToPayment = () => {
		const data = {
			itemsPrice: itemsPrice.toFixed(2),
			shippingPrice,
			totalPrice,
		}
		sessionStorage.setItem("orderInfo", JSON.stringify(data))
		navigate("/payment")
	}

	return (
		<Fragment>
			<MetaData title={"Potwierdzenie zamówienia"} />
			<CheckoutSteps shipping confirmOrder />

			<div className='row d-flex justify-content-between'>
				<div className='col-12 col-lg-8 mt-5 order-confirm'>
					<h4 className='mb-3'>Dane do dostawy</h4>
					<p>
						<b>Nazwa:</b> {user && user.name}
					</p>
					<p>
						<b>Numer telefonu:</b> {shippingInfo.phoneNo}
					</p>
					<p className='mb-4'>
						<b>Adres:</b>{" "}
						{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
					</p>

					<hr />
					<h4 className='mt-4'>Twoje zakupy:</h4>
					{cartItems.map(item => (
						<Fragment>
							<hr />
							<div className='cart-item my-1' key={item.product}>
								<div className='row'>
									<div className='col-4 col-lg-2'>
										<img src={item.image} alt='Laptop' height='45' width='65' />
									</div>

									<div className='col-5 col-lg-6'>
										<Link
											to={`/product/${item.product}`}
											className='text-decoration-none'>
											{item.name}
										</Link>
									</div>

									<div className='col-4 col-lg-4 mt-4 mt-lg-0'>
										<p>
											{item.quantity} x {item.price} zł ={" "}
											<b>{(item.quantity * item.price).toFixed(2)} zł</b>
										</p>
									</div>
								</div>
							</div>
							<hr />
						</Fragment>
					))}
				</div>

				<div className='col-12 col-lg-3 my-4'>
					<div id='order_summary'>
						<h4>Podsumowanie</h4>
						<hr />
						<p>
							Wartość koszyka:
							<span className='order-summary-values'>
								{itemsPrice.toFixed(2)} zł
							</span>
						</p>
						<p>
							Dostawa:
							<span className='order-summary-values'>{shippingPrice} zł</span>
						</p>

						<hr />

						<p>
							Łącznie:
							<span className='order-summary-values'>{totalPrice} zł</span>
						</p>

						<hr />
						<button
							id='checkout_btn'
							className='btn btn-primary btn-block fw-bold'
							onClick={processToPayment}>
							PŁATNOŚĆ
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default ConfirmOrder
