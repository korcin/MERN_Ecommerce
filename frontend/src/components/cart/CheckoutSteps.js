import React from "react"
import { Link } from "react-router-dom"

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
	return (
		<div className='checkout process d-flex justify-content-center mt-5'>
			{shipping ? (
				<Link to='/shipping' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Dostawa</div>
					<div className='triangle-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled className='float-right'>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Dostawa</div>
					<div className='triangle-incomplete'></div>
				</Link>
			)}
			{confirmOrder ? (
				<Link to='/order/confirm' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Potwierdź zamówienie</div>
					<div className='triangle-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled className='float-right'>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Potwierdź zamówienie</div>
					<div className='triangle-incomplete'></div>
				</Link>
			)}
			{payment ? (
				<Link to='/payment' className='float-right'>
					<div className='triangle2-active'></div>
					<div className='step active-step'>Płatność</div>
					<div className='triangle-active'></div>
				</Link>
			) : (
				<Link to='#!' disabled className='float-right'>
					<div className='triangle2-incomplete'></div>
					<div className='step incomplete'>Płatność</div>
					<div className='triangle-incomplete'></div>
				</Link>
			)}
		</div>
	)
}

export default CheckoutSteps
