import React, { useContext } from "react";
import { logo, logout } from "../Assets";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios"; // Import axios for API calls
import toast from "react-hot-toast";

function Navbar() {
	const { navigate, signedUp, setSignedUp, endpointURL } =
		useContext(AppContext);

	const handleLogout = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					await axios.post(
						`${endpointURL}/endpoint/auth/signout`,
						{},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					toast.success("Logged out successfully");
				} catch (err) {
					if (err.response && err.response.status === 401) {
						toast.error(
							"Your session has expired. Please log in again."
						);
					} else {
						console.error("Logout failed:", err.message);
						toast.error("Logout failed. Please try again.");
					}
				}
			}
			localStorage.removeItem("token"); // Clear the token
			setSignedUp(false); // Update state
			navigate("/"); // Redirect to home page
		} catch (err) {
			console.error("Logout failed:", err.message);
			toast.error("Logout failed. Please try again.");
		}
	};

	return (
		<nav className="relative pb-10">
			<div
				className={`flex items-center justify-between ${
					signedUp === false ? "justify-center" : ""
				}`}
			>
				<Link
					to={signedUp === false ? "/" : "/budget"}
					className={
						"flex items-center gap-4 font-extrabold text-3xl"
					}
				>
					<img src={logo} alt="logo" className="w-8" />
					<p
						className={`${
							signedUp !== false ? "hidden sm:block" : ""
						}`}
					>
						FinanceFlow
					</p>
				</Link>
				{signedUp && (
					<div className="flex gap-5 text-sm underline underline-offset-2 decoration-accent">
						<Link
							to="/budget"
							className="hover:scale-105 transition-all duration-300"
						>
							Budget
						</Link>
						<Link
							to="/expense"
							className="hover:scale-105 transition-all duration-300"
						>
							Expense
						</Link>
						<Link
							to="/about"
							className="hover:scale-105 transition-all duration-300"
						>
							About Us
						</Link>

						<img
							src={logout}
							alt="logout icon"
							className="w-6 cursor-pointer hover:-translate-x-0.5 transition-all duration-300"
							onClick={handleLogout}
						/>
					</div>
				)}
			</div>
			<span className="w-full mt-2 h-[2px] bg-accent absolute" />
		</nav>
	);
}

export default Navbar;
