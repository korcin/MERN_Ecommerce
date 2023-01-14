import React, { Fragment, useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"

import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import Sidebar from "./Sidebar"

import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import {
	getProductReviews,
	clearErrors,
	deleteReview,
} from "../../actions/productActions"
import { DELETE_REVIEW_RESET } from "../../constants/productConstants"

const ProductReviews = () => {
	const [productId, setProductId] = useState("")

	const alert = useAlert()
	const dispatch = useDispatch()

	const { loading, error, reviews } = useSelector(state => state.productReviews)
	const { isDeleted } = useSelector(state => state.review)

	useEffect(() => {
		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (productId !== "") {
			dispatch(getProductReviews(productId))
		}

		if (isDeleted) {
			alert.success("Usunięto opinię.")
			dispatch({ type: DELETE_REVIEW_RESET })
		}
	}, [dispatch, alert, error, productId, isDeleted])

	const deleteReviewHandler = id => {
		dispatch(deleteReview(id, productId))
	}

	const submitHandler = e => {
		e.preventDefault()
		dispatch(getProductReviews(productId))
	}

	const setReviews = () => {
		const data = {
			columns: [
				{
					label: "ID opinii",
					field: "id",
					sort: "asc",
				},
				{
					label: "Ocena",
					field: "rating",
					sort: "asc",
				},
				{
					label: "Treść",
					field: "comment",
					sort: "asc",
				},
				{
					label: "Użytkownik",
					field: "user",
					sort: "asc",
				},
				{
					label: "Szczegóły",
					field: "actions",
				},
			],
			rows: [],
		}
		reviews.forEach(review => {
			data.rows.push({
				id: review._id,
				rating: review.rating,
				comment: review.comment,
				user: review.name,
				actions: (
					<Fragment>
						<button
							className='btn btn-danger py-1 px-2 mx-2'
							onClick={() => deleteReviewHandler(review._id)}>
							<i className='fa fa-trash'></i>
						</button>
					</Fragment>
				),
			})
		})
		return data
	}

	return (
		<Fragment>
			<MetaData title={"Opinie"} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 '>
					<Fragment>
						<h1 className='my-5'>Opinie</h1>

						<div className='row justify-content-center mt-5'>
							<div className='col-5'>
								<form onSubmit={submitHandler}>
									<div className='form-group'>
										<label htmlFor='productId_field' className='form-label'>
											Wprowadź ID produktu
										</label>
										<input
											type='text'
											id='email_field'
											className='form-control'
											value={productId}
											onChange={e => setProductId(e.target.value)}
										/>
									</div>

									<div className='d-grid'>
										<button
											id='search_button'
											type='submit'
											className='btn btn-primary py-2 mt-2'>
											SZUKAJ
										</button>
									</div>
								</form>
							</div>
						</div>

						{reviews && reviews.length > 0 ? (
							<MDBDataTable
								data={setReviews()}
								className='px-3 table-wrap'
								bordered
								striped
								hover
							/>
						) : (
							<p className='mt-5 text-center'>Brak opinii.</p>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	)
}

export default ProductReviews
