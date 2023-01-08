import React, { Fragment, useEffect } from "react"
import MetaData from "../layout/MetaData"
import CheckoutSteps from "./CheckoutSteps"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js"
import axios from "axios"

const options = {
	style: {
		base: {
			fontSize: "16px",
		},
		invalid: {
			color: "#9e2146",
		},
	},
}

const Payment = () => {
	const navigate = useNavigate()
	const alert = useAlert()
	const stripe = useStripe()
	const elements = useElements()
	const dispatch = useDispatch()

	const { user } = useSelector(state => state.auth)
	const { cartItems, shippingInfo } = useSelector(state => state.cart)

	useEffect(() => {}, [])

	return (
		<Fragment>
			<MetaData title={"Płatność"} />
			<CheckoutSteps shipping confirmOrder payment />
			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form className='shadow-lg'>
						<h1 className='mb-4'>Dane karty</h1>
						<div className='form-group mb-3'>
							<label htmlFor='card_num_field'>Numer katry</label>
							<CardNumberElement
								type='text'
								id='card_num_field'
								className='form-control'
								options={options}
							/>
						</div>

						<div className='form-group mb-3'>
							<label htmlFor='card_exp_field'>Data ważności karty</label>
							<CardExpiryElement
								type='text'
								id='card_exp_field'
								className='form-control'
								options={options}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='card_cvc_field'>CVC</label>
							<CardCvcElement
								type='text'
								id='card_cvc_field'
								className='form-control'
								options={options}
							/>
						</div>

						<button id='pay_btn' type='submit' className='btn btn-block py-3 fw-bold'>
							Zapłać
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default Payment
