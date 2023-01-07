import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"

const Profile = () => {
	const { user, loading } = useSelector(state => state.auth)

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={"Mój profil"} />
					<h2 className='mt-5 ml-5'>Mój Profil</h2>
					<div className='row justify-content-around mt-5 user-info'>
						<div className='col-12 col-md-3'>
							<figure className='avatar avatar-profile'>
								<img
									className='rounded-circle img-fluid'
									src={user.avatar.url}
									alt={user.name}
								/>
							</figure>
							<Link
								to='/me/update'
								id='edit_profile'
								className='d-grid gap-2  btn btn-primary mt-3'>
								Edytuj profil
							</Link>
						</div>

						<div className='col-12 col-md-5'>
							<h4>Pełna nazwa</h4>
							<p>{user.name}</p>

							<h4>Adres email</h4>
							<p>{user.email}</p>

							<h4>Dołączono</h4>
							<p>{String(user.createdAt).substring(0, 10)}</p>

							<div className='d-grid gap-2 col-6 '>
								{user.role !== "admin" && (
									<Link to='/orders/me' className='btn btn-danger p-3'>
										Moje zamówienia
									</Link>
								)}

								<Link to='/password/update' className='btn btn-primary p-3'>
									Zmień hasło
								</Link>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Profile
