import React, { Fragment, useEffect } from "react"
import MetaData from "./layout/MetaData"
import Product from "./product/Product"
import Loader from "./layout/Loader"

import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { getProducts } from "../actions/productActions"

const Home = () => {
	const alert = useAlert()
	const dispatch = useDispatch()

	const { loading, products, error, productsCount } = useSelector(
		state => state.products
	)

	useEffect(() => {
		if (error) {
			return alert.error(error)
		}
		dispatch(getProducts())
	}, [dispatch, alert, error])

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
				</Fragment>
			)}
		</Fragment>
	)
}

export default Home