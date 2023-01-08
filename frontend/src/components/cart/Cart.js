import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import MetaData from "../layout/MetaData"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from "../../actions/cartActions"

const Cart = () => {
	const dispatch = useDispatch()

	const { cartItems } = useSelector(state => state.cart)

	const increaseQty = (id, quantity, stock) => {
		const newQty = quantity + 1

		if (newQty > stock) return

		dispatch(addItemToCart(id, newQty))
	}

	const decreaseQty = (id, quantity) => {
		const newQty = quantity - 1

		if (newQty <= 0) return

		dispatch(addItemToCart(id, newQty))
	}

	return (
		<Fragment>
			{cartItems.length === 0 ? (
				<h2 classNameName='mt-5'>Twój koszyk jest pusty.</h2>
			) : (
				<Fragment>
					<MetaData title={"Twój koszyk"} />
					<h2 className='mt-5'>
						Koszyk <b>({cartItems.length})</b>
					</h2>

					<div className='row d-flex justify-content-between'>
						<div className='col-12 col-lg-8'>
							{cartItems.map(item => (
								<Fragment>
									<hr />
									<div className='cart-item'>
										<div className='row'>
											<div className='col-4 col-lg-3'>
												<img
													src={item.image}
													alt='Laptop'
													height='90'
													width='115'
												/>
											</div>

											<div className='col-5 col-lg-3'>
												<Link
													to={`/product/${item.product}`}
													className='text-decoration-none'>
													{item.name}
												</Link>
											</div>

											<div className='col-4 col-lg-2 mt-4 mt-lg-0'>
												<p id='card_item_price'>{item.price} zł</p>
											</div>

											<div className='col-4 col-lg-3 mt-4 mt-lg-0'>
												<div className='stockCounter d-inline'>
													<span
														className='btn btn-danger minus'
														onClick={() =>
															decreaseQty(item.product, item.quantity)
														}>
														-
													</span>
													<input
														type='number'
														className='form-control count d-inline'
														value={item.quantity}
														readOnly
													/>

													<span
														className='btn btn-primary plus'
														onClick={() =>
															increaseQty(
																item.product,
																item.quantity,
																item.stock
															)
														}>
														+
													</span>
												</div>
											</div>

											<div className='col-4 col-lg-1 mt-4 mt-lg-0'>
												<i
													id='delete_cart_item'
													className='fa fa-trash btn btn-danger'></i>
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
									Łączna kwota:{" "}
									<span className='order-summary-values'>$765.56</span>
								</p>

								<hr />
								<button id='checkout_btn' className='btn btn-primary btn-block'>
									Check out
								</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Cart
