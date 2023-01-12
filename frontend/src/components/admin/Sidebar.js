import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
	return (
		<div className='sidebar-wrapper'>
			<nav id='sidebar'>
				<ul className='list-unstyled components'>
					<li>
						<Link to='/dashboard'>
							<i className='fa fa-tachometer-alt'></i> Panel zarządzania
						</Link>
					</li>

					<li>
						<a
							className='dropdown-toggle'
							href='#productSubmenu'
							data-bs-toggle='collapse'
							aria-expanded='false'
							>
							<i className='fa fa-product-hunt'></i> Produkty (więcej)
						</a>
						<ul className='collapse list-unstyled' id='productSubmenu'>
							<li>
								<Link to='/admin/products'>
									<i className='fa fa-clipboard'></i> Wszystkie
								</Link>
							</li>

							<li>
								<Link to='/admin/product'>
									<i className='fa fa-plus'></i> Stwórz nowy
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to='/admin/orders'>
							<i className='fa fa-shopping-basket'></i> Zamówienia
						</Link>
					</li>

					<li>
						<Link to='/admin/users'>
							<i className='fa fa-users'></i> Użytkownicy
						</Link>
					</li>

					<li>
						<Link to='/admin/reviews'>
							<i className='fa fa-star'></i> Opinie
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
