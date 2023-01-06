import React, { Fragment, useState, useEffect } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader"
import MetaData from "../layout/MetaData"
import { Link } from "react-router-dom"
import { login, clearErrors } from "../../actions/userActions"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const alert = useAlert()
	const dispatch = useDispatch()

	const { isAuthenticated, error, loading } = useSelector(state => state.auth)

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/")
		}

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}
	}, [dispatch, alert, isAuthenticated, error, navigate])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={"Zaloguj"} />

					<div className='row wrapper'>
						<div className='col-10 col-lg-5'>
							<form className='shadow-lg' onSubmit={submitHandler}>
								<h1 className='mb-3'>Logowanie</h1>
								<div className='form-group'>
									<label htmlFor='email_field'>Email</label>
									<input
										type='email'
										id='email_field'
										className='form-control'
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>

								<div className='form-group mt-3 mb-1'>
									<label htmlFor='password_field'>Hasło</label>
									<input
										type='password'
										id='password_field'
										className='form-control'
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
								</div>

								<Link to='/password/forgot' className='mt-2'>
									Nie pamiętasz hasła?
								</Link>

								<div className='d-grid gap-2'>
									<button id='login_button' type='submit' className='btn'>
										ZALOGUJ SIĘ
									</button>
								</div>

								<Link to='/register'>Zarejestruj się</Link>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Login
