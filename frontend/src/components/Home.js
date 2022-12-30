import React, { Fragment, useState, useEffect } from "react"
import MetaData from "./layout/MetaData"
import Product from "./product/Product"
import Loader from "./layout/Loader"
import Pagination from "react-js-pagination"

import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { getProducts } from "../actions/productActions"

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const alert = useAlert()
	const dispatch = useDispatch()

	const { loading, products, error, productsCount, resPerPage } = useSelector(
		state => state.products
	)

	useEffect(() => {
		if (error) {
			return alert.error(error)
		}
		dispatch(getProducts(currentPage))
	}, [dispatch, alert, error, currentPage])

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber)
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={"Kup najlepsze produkty online"} />
					<h1 id='products_heading'>Najnowsze produkty</h1>
					<section id='products' className='container mt-5'>
						<div className='row'>
							{products &&
								products.map(product => (
									<Product key={product._id} product={product} />
								))}
						</div>
					</section>

					{resPerPage <= productsCount && (
						<div className='d-flex justify-content-center mt-5'>
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resPerPage}
								totalItemsCount={productsCount}
								onChange={setCurrentPageNo}
								itemClass='page-item'
								linkClass='page-link'
							/>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export default Home
