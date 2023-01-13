import React, { Fragment, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import Sidebar from "./Sidebar"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { allOrders, clearErrors } from "../../actions/orderActions"

const OrdersList = () => {
	const alert = useAlert()
	const dispatch = useDispatch()
	// const navigate = useNavigate()

	const { loading, error, orders } = useSelector(state => state.allOrders)

	useEffect(() => {
		dispatch(allOrders())

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		// if (isDeleted) {
		// 	alert.success("Usunięto produkt.")
		// 	navigate("/admin/products")
		// 	dispatch({ type: DELETE_PRODUCT_RESET })
		// }
	}, [dispatch, alert, error])

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: "ID zamówienia",
					field: "id",
					sort: "asc",
				},
				{
					label: "Ilość produktów",
					field: "numOfItems",
					sort: "asc",
				},
				{
					label: "Wartość",
					field: "amount",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Szczegóły",
					field: "actions",
				},
			],
			rows: [],
		}
		orders.forEach(order => {
			data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: `${order.totalPrice} zł`,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes("Dostarczono") ? (
						<p style={{ color: "green" }}>{order.orderStatus}</p>
					) : (
						<p style={{ color: "red" }}>{order.orderStatus}</p>
					),
				actions: (
					<Fragment>
						<Link
							to={`/admin/order/${order._id}`}
							className='btn btn-primary py-1 px-2'>
							<i className='fa fa-eye'></i>
						</Link>
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
			<MetaData title={"Wszystkie zamówienia"} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 '>
					<Fragment>
						<h1 className='my-5'>Wszystkie zamówienia</h1>

						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setOrders()}
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

export default OrdersList
