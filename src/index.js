import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ProtectedRoute from './util/ProtectedRoute';
import App from './App';
import Auth from './authComponents/Auth';
import AuthRegistration from './authComponents/AuthRegistration';
import AuthLogin from './authComponents/AuthLogin';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Movie from './components/Movie';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<BrowserRouter basename={'/'}>
			<Routes>
				<Route path='/authComponents' element={<Auth />}>
					<Route path='AuthLogin' element={<AuthLogin />} />
					<Route path='AuthRegistration' element={<AuthRegistration />} />
				</Route>
				
				<Route path="/" element={<App />}>
					<Route path='' element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					} />
					<Route path='Home' element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					} />
					<Route path='About' element={
						<ProtectedRoute>
							<About />
						</ProtectedRoute>
					} />
					<Route path='Profile' element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					} />
					<Route path='Movie/:movieId' element={
						<ProtectedRoute>
							<Movie />
						</ProtectedRoute>
					} />
				</Route>
			</Routes>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				/>
		</BrowserRouter>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals