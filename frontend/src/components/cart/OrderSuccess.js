import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import MetaData from "../layout/MetaData"

const OrderSuccess = () => {
	return (
		<Fragment>
			<MetaData title={"Pomyślnie zamówiono"} />

			<div className='row justify-content-center'>
				<div className='col-6 mt-5 text-center'>
					<img
						className='my-5 img-fluid d-block mx-auto'
						src='/images/success.png'
						alt='Pomyślnie zamówiono'
						width='200'
						height='200'
					/>

					<h2>Zamówienie zostało złożone.</h2>

					<Link to='/orders/me'>Zobacz swoje zamówienia</Link>
				</div>
			</div>
		</Fragment>
	)
}

export default OrderSuccess
