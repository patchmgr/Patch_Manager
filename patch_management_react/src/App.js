import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import HomePage from './components/HomePage';
import AboutPage from './components/AboutUs';
import Form from './components/Form';
import LoginPage from './components/Login';
import { useNavigate, useParams, useLocation } from 'react-router-dom';




function App() {
	return (
		<Router>
			<NavigationBar />
			<Routes>
				<Route path="/home" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<Form/>} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}

export default App;
