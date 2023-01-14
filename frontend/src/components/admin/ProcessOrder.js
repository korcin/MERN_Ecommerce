import React, { Fragment, useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import Sidebar from "./Sidebar"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import {
	getOrderDetails,
	updateOrder,
	clearErrors,
} from "../../actions/orderActions"
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants"

const ProcessOrder = () => {
	const alert = useAlert()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const [status, setStatus] = useState("")

	const { loading, order = {} } = useSelector(state => state.orderDetails)
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		user,
		totalPrice,
		orderStatus,
	} = order
	const { error, isUpdated } = useSelector(state => state.order)

	useEffect(() => {
		dispatch(getOrderDetails(id))

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (isUpdated) {
			alert.success("Zaktualizowano zamówienie.")
			dispatch({ type: UPDATE_ORDER_RESET })
		}
	}, [dispatch, alert, error, isUpdated, id])

	const updateOrderHandler = id => {
		const formData = new FormData()
		formData.set("status", status)

		dispatch(updateOrder(id, formData))
	}
	const shippingDetails =
		shippingInfo &&
		`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
	const isPaid =
		paymentInfo && paymentInfo.status === "succeeded" ? true : false

	return (
		<Fragment>
			<MetaData title={`Przetwarzanie zamówienia ${order._id}`} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 '>
					<Fragment>
						{loading ? (
							<Loader />
						) : (
							<div className='row d-flex justify-content-around'>
								<div className='col-12 col-lg-7 order-details'>
									<h1 className='my-5'>Zamówienie nr ({order && order._id})</h1>

									<h4 className='mb-4'>Dane odbiorcy</h4>
									<p>
										<b>Nazwa:</b> {user && user.name}
									</p>
									<p>
										<b>Telefon:</b> {shippingInfo && shippingInfo.phoneNo}
									</p>
									<p className='mb-4'>
										<b>Adres:</b> {shippingDetails}
									</p>
									<p>
										<b>Kwota:</b> {totalPrice} zł
									</p>

									<hr />

									<h4 className='my-4'>Płatność</h4>
									<p className={isPaid ? "greenColor" : "redColor"}>
										<b>{isPaid ? "OPŁACONE" : "NIEOPŁACONE"}</b>
									</p>

									<h4 className='my-4'>Stripe ID</h4>
									<p>
										<b>{paymentInfo && paymentInfo.id}</b>
									</p>

									<h4 className='my-4'>Status zamówienia:</h4>
									<p
										className={
											order.orderStatus &&
											String(order.orderStatus).includes("Dostarczono")
												? "greenColor"
												: "redColor"
										}>
										<b>{orderStatus}</b>
									</p>

									<h4 className='my-4'>Zamówienie:</h4>

									<hr />
									<div className='cart-item my-1'>
										{orderItems &&
											orderItems.map(item => (
												<div key={item.product} className='row my-5'>
													<div className='col-4 col-lg-2'>
														<img
															src={item.image}
															alt={item.name}
															height='45'
															width='65'
														/>
													</div>

													<div className='col-5 col-lg-5'>
														<Link
															to={`/products/${item.product}`}
															className='text-decoration-none'>
															{item.name}
														</Link>
													</div>

													<div className='col-4 col-lg-2 mt-4 mt-lg-0'>
														<p>{item.price} zł</p>
													</div>

													<div className='col-4 col-lg-3 mt-4 mt-lg-0'>
														<p>Ilość: {item.quantity}</p>
													</div>
												</div>
											))}
									</div>
									<hr />
								</div>

								<div className='col-12 col-lg-3 mt-5'>
									<h4 className='my-4'>Status</h4>

									<div className='form-group'>
										<select
											className='form-control'
											name='status'
											value={status}
											onChange={e => setStatus(e.target.value)}>
											<option value='W realizacji'>W realizacji</option>
											<option value='Dostarczono'>Dostarczono</option>
										</select>
									</div>

									<button
										className='btn btn-primary btn-block'
										onClick={() => updateOrderHandler(order._id)}>
										Zaktualizuj status
									</button>
								</div>
							</div>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	)
}

export default ProcessOrder
