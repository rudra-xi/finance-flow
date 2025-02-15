import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Budget, Expense, About, SignIn } from "./Pages";
import { Navbar, Footer } from "./Components";

function App() {
	return (
		<div className="bg-primary px-5 pt-3 text-secondary min-h-screen font-inter">
			<Toaster position="top-center" reverseOrder={false} />
			<Navbar />

			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/budget" element={<Budget />} />
				<Route path="/expense" element={<Expense />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
