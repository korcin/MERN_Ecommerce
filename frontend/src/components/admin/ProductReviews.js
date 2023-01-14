import React, { Fragment, useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"

import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import Sidebar from "./Sidebar"

import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { getProductReviews, clearErrors } from "../../actions/productActions"
// import { DELETE_REVIEWS_RESET } from "../../constants/productConstants"

const ProductReviews = () => {
	const [productId, setProductId] = useState("")

	const alert = useAlert()
	const dispatch = useDispatch()

	const { error, reviews } = useSelector(state => state.productReviews)

	useEffect(() => {
		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (productId !== "") {
			dispatch(getProductReviews(productId))
		}

		// if (isDeleted) {
		// 	alert.success("Usunięto użytkownika.")
		// 	navigate("/admin/users")
		// 	dispatch({ type: DELETE_USER_RESET })
		// }
	}, [dispatch, alert, error, productId])

	// const deleteUserHandler = id => {
	// 	dispatch(deleteUser(id))
	// }

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
						<button className='btn btn-danger py-1 px-2 mx-2'>
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
