import React, { Fragment, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import {
	getAdminProducts,
	clearErrors,
	deleteProduct,
} from "../../actions/productActions"
import Sidebar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants"

const ProductList = () => {
	const alert = useAlert()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { loading, error, products } = useSelector(state => state.products)
	const { error: deleteError, isDeleted } = useSelector(state => state.product)

	useEffect(() => {
		dispatch(getAdminProducts())

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (deleteError) {
			alert.error(deleteError)
			dispatch(clearErrors())
		}

		if (isDeleted) {
			alert.success("Usunięto produkt.")
			navigate("/admin/products")
			dispatch({ type: DELETE_PRODUCT_RESET })
		}
	}, [dispatch, alert, error, deleteError, isDeleted, navigate])

	const setProducts = () => {
		const data = {
			columns: [
				{
					label: "Nr zamówienia",
					field: "id",
					sort: "asc",
				},
				{
					label: "Nazwa",
					field: "name",
					sort: "asc",
				},
				{
					label: "Cena",
					field: "price",
					sort: "asc",
				},
				{
					label: "W magazynie",
					field: "stock",
					sort: "asc",
				},
				{
					label: "Szczegóły",
					field: "actions",
				},
			],
			rows: [],
		}
		products &&
			products.forEach(product => {
				data.rows.push({
					id: product._id,
					name: product.name,
					price: `${product.price} zł`,
					stock: product.stock,
					actions: (
						<Fragment>
							<Link
								to={`/admin/product/${product._id}`}
								className='btn btn-primary py-1 px-2'>
								<i className='fa fa-pencil'></i>
							</Link>
							<button
								className='btn btn-danger py-1 px-2 mx-2'
								onClick={() => deleteProductHandler(product._id)}>
								<i className='fa fa-trash'></i>
							</button>
						</Fragment>
					),
				})
			})
		return data
	}

	const deleteProductHandler = id => {
		dispatch(deleteProduct(id))
	}

	return (
		<Fragment>
			<MetaData title={"Wszystkie produkty"} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 '>
					<Fragment>
						<h1 className='my-5'>Wszystkie produkty</h1>

						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setProducts()}
								className='px-3'
								bordered
								striped
								hover
							/>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	)
}

export default ProductList
