import { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Header from "./components/layout/Header"
import Home from "./components/Home"

import Footer from "./components/layout/Footer"
import ProductDetails from "./components/product/ProductDetails"

import Login from "./components/user/Login"
import Register from "./components/user/Register"

import { loadUser } from "./actions/userActions"
import store from "./store"

import "./App.css"

function App() {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Router>
			<div className='App'>
				<Header />
				<div className='container container-fluid'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/search/:keyword' element={<Home />} />
						<Route path='/product/:id' element={<ProductDetails />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
