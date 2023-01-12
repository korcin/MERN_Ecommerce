import React, { Fragment, useEffect } from "react"
import { Link } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import Sidebar from "./Sidebar"

import { useDispatch, useSelector } from "react-redux"
import { getAdminProducts } from "../../actions/productActions"

const Dashboard = () => {
	const dispatch = useDispatch()

	const { products } = useSelector(state => state.products)

	let outOfStock = 0
	products.forEach(product => {
		if (product.stock === 0) {
			outOfStock += 1
		}
	})

	useEffect(() => {
		dispatch(getAdminProducts())
	}, [dispatch])

	return (
		<Fragment>
			<MetaData title={"Panel zarządzania"} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>
				<div className='col-12 col-md-10'>
					<h1 className='my-4'>Panel zarządzania</h1>
					<div className='row px-4'>
						<div className='col-xl-12 col-sm-12 mb-3'>
							<div className='card text-white bg-primary o-hidden h-100'>
								<div className='card-body'>
									<div className='text-center card-font-size'>
										Całkowita kwota:
										<br /> <b>$4567</b>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='row px-4'>
						<div className='col-xl-3 col-sm-6 mb-3'>
							<div className='card text-white bg-success o-hidden h-100'>
								<div className='card-body'>
									<div className='text-center card-font-size'>
										Produkty
										<br /> <b>{products && products.length}</b>
									</div>
								</div>
								<Link
									className='card-footer text-white clearfix small z-1'
									to='/admin/products'>
									<span className='float-left'>Zobacz szczegóły</span>
									<span className='float-right'>
										<i className='fa fa-angle-right'></i>
									</span>
								</Link>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-3'>
							<div className='card text-white bg-danger o-hidden h-100'>
								<div className='card-body'>
									<div className='text-center card-font-size'>
										Zamówienia
										<br /> <b>125</b>
									</div>
								</div>
								<Link
									className='card-footer text-white clearfix small z-1'
									to='/admin/orders'>
									<span className='float-left'>Zobacz szczegóły</span>
									<span className='float-right'>
										<i className='fa fa-angle-right'></i>
									</span>
								</Link>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-3'>
							<div className='card text-white bg-info o-hidden h-100'>
								<div className='card-body'>
									<div className='text-center card-font-size'>
										Użytkownicy
										<br /> <b>45</b>
									</div>
								</div>
								<Link
									className='card-footer text-white clearfix small z-1'
									href='/admin/users'>
									<span className='float-left'>Zobacz szczegóły</span>
									<span className='float-right'>
										<i className='fa fa-angle-right'></i>
									</span>
								</Link>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-3'>
							<div className='card text-white bg-warning o-hidden h-100'>
								<div className='card-body'>
									<div className='text-center card-font-size'>
										Brak w magazynie
										<br /> <b>{outOfStock}</b>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Dashboard
