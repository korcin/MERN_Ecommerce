import React, { Fragment } from "react"
import Search from "./Search"
import "../../App.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { logout } from "../../actions/userActions"

const Header = () => {
	const alert = useAlert()
	const dispatch = useDispatch()

	const { user, loading } = useSelector(state => state.auth)
	const { cartItems } = useSelector(state => state.cart)

	const logoutHandler = () => {
		dispatch(logout())
		alert.success("Pomyślnie wylogowano.")
	}

	return (
		<Fragment>
			<nav className='navbar row sticky-top'>
				<div className='col-12 col-md-3'>
					<div className='navbar-brand'>
						<Link to='/' className='text-decoration-none'>
							<h3 className='text-white ms-3'>Sklep E-Commerce</h3>
						</Link>
					</div>
				</div>

				<div className='col-12 col-md-6 mt-2 mt-md-0 ms-4 ms-md-0 input'>
					<Search />
				</div>

				<div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
					{user ? (
						<div className='ml-4 dropdown d-inline'>
							<Link
								to='#!'
								className='btn dropdown-toggle text-white me-4'
								type='button'
								id='dropdownMenuButton'
								data-bs-toggle='dropdown'
								// aria-haspopup='true'
								aria-expanded='false'>
								<figure className='avatar avatar-nav'>
									<img
										src={user.avatar && user.avatar.url}
										alt={user && user.name}
										className='rounded-circle'
									/>
								</figure>
								<span>{user && user.name}</span>
							</Link>

							<div
								className='dropdown-menu'
								aria-labelledby='dropdownMenuButton'>
								{user && user.role === "admin" && (
									<Link className='dropdown-item' to='/dashboard'>
										Panel zarządzania
									</Link>
								)}
								<Link className='dropdown-item' to='/orders/me'>
									Moje zamówienia
								</Link>
								<Link className='dropdown-item' to='/me'>
									Profil
								</Link>
								<Link
									className='dropdown-item text-danger'
									to='/'
									onClick={logoutHandler}>
									Wyloguj się
								</Link>
							</div>
						</div>
					) : (
						!loading && (
							<Link to='/login' className='btn me-3' id='login_btn'>
								Zaloguj
							</Link>
						)
					)}

					<Link to='/cart' style={{ textDecoration: "none" }}>
						<span id='cart' className='ml-3'>
							Koszyk
						</span>
						<span className='ml-1' id='cart_count'>
							{cartItems.length}
						</span>
					</Link>
				</div>
			</nav>
		</Fragment>
	)
}

export default Header
