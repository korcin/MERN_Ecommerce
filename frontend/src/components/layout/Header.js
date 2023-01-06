import React, { Fragment } from "react"
import Search from "./Search"
import "../../App.css"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<Fragment>
			<nav className='navbar row'>
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
					<Link to='/login' className='btn me-3' id='login_btn'>
						Zaloguj
					</Link>

					<span id='cart' className='ml-3'>
						Koszyk
					</span>
					<span className='ml-1' id='cart_count'>
						2
					</span>
				</div>
			</nav>
		</Fragment>
	)
}

export default Header
