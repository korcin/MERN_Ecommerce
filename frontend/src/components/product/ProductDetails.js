import React, { Fragment, useEffect, useState } from "react"
import Loader from "../layout/Loader"
import MetaData from "../layout/MetaData"
import { Carousel } from "react-bootstrap"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetails, clearErrors } from "../../actions/productActions"
import { useParams } from "react-router-dom"

const ProductDetails = ({ match }) => {
	const [quantity, setQuantity] = useState(1)
	const dispatch = useDispatch()
	const alert = useAlert()
	const { id } = useParams()
	const { loading, error, product } = useSelector(state => state.productDetails)

	useEffect(() => {
		dispatch(getProductDetails(id))

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}
	}, [dispatch, alert, error, id])

	const increaseQty = () => {
		const count = document.querySelector(".count")

		if (count.valueAsNumber >= product.stock) return

		const qty = count.valueAsNumber + 1
		setQuantity(qty)
	}

	const decreaseQty = () => {
		const count = document.querySelector(".count")

		if (count.valueAsNumber <= 1) return

		const qty = count.valueAsNumber - 1
		setQuantity(qty)
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={product.name} />
					<div className='row f-flex justify-content-around'>
						<div className='col-12 col-lg-5 img-fluid' id='product_image'>
							<Carousel pause='hover'>
								{product.images &&
									product.images.map(image => (
										<Carousel.Item key={image.public_id}>
											<img
												className='d-block w-100 h-100'
												src={image.url}
												alt={product.title}
											/>
										</Carousel.Item>
									))}
							</Carousel>
						</div>
						<div className='col-12 col-lg-5 mt-5'>
							<h3>{product.name}</h3>
							<p id='product_id'>Kod produktu #{product._id}</p>

							<hr />

							<div className='rating-outer'>
								<div
									className='rating-inner'
									style={{
										width: `${(product.ratings / 5) * 100}%`,
									}}></div>
							</div>
							<span id='no_of_reviews'>({product.numOfReviews} Opinii)</span>

							<hr />

							<p id='product_price'>{product.price} zł</p>
							<div className='stockCounter d-inline'>
								<span className='btn btn-danger minus' onClick={decreaseQty}>
									-
								</span>

								<input
									type='number'
									className='form-control count d-inline'
									value={quantity}
									readOnly
								/>

								<span className='btn btn-primary plus' onClick={increaseQty}>
									+
								</span>
							</div>
							<button
								type='button'
								id='cart_btn'
								className='btn btn-primary d-inline ms-3'>
								Dodaj do koszyka
							</button>

							<hr />

							<p>
								Status:{" "}
								<span
									id='stock_status'
									className={product.stock > 0 ? "greenColor" : "redColor"}>
									{product.stock > 0 ? "Dostępny" : "Niedostępny"}
								</span>
							</p>

							<hr />

							<h4 className='mt-2'>Opis:</h4>
							<p>{product.description}</p>
							<hr />
							<p id='product_seller mb-3'>
								Producent: <strong>{product.seller}</strong>
							</p>

							<button
								id='review_btn'
								type='button'
								className='btn btn-primary mt-4'
								data-bs-toggle='modal'
								data-bs-target='#ratingModal'>
								Dodaj opinię
							</button>

							<div className='row mt-2 mb-5'>
								<div className='rating w-50'>
									<div
										className='modal fade'
										id='ratingModal'
										tabIndex='-1'
										role='dialog'
										aria-labelledby='ratingModalLabel'
										aria-hidden='true'>
										<div className='modal-dialog' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id='ratingModalLabel'>
														Treść opinii
													</h5>
													<button
														type='button'
														className='btn-close'
														data-bs-dismiss='modal'
														aria-label='Close'></button>
												</div>
												<div className='modal-body'>
													<ul className='stars'>
														<li className='star'>
															<i className='fa fa-star'></i>
														</li>
														<li className='star'>
															<i className='fa fa-star'></i>
														</li>
														<li className='star'>
															<i className='fa fa-star'></i>
														</li>
														<li className='star'>
															<i className='fa fa-star'></i>
														</li>
														<li className='star'>
															<i className='fa fa-star'></i>
														</li>
													</ul>

													<textarea
														name='review'
														id='review'
														className='form-control mt-3'></textarea>

													<div className='modal-footer'>
														<button
															className='my-3 float-right submit-btn px-4 text-white'
															data-bs-dismiss='modal'
															aria-label='Close'>
															Dodaj opinię
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default ProductDetails
