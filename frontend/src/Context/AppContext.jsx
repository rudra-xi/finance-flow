import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const AppContext = createContext();

// --- THEME HELPER FUNCTION ---
// Function to get the initial theme from localStorage or default to 'dark'
const getInitialTheme = () => {
	// Check if a theme preference is saved in localStorage
	if (typeof window !== "undefined" && window.localStorage.getItem("theme")) {
		return window.localStorage.getItem("theme");
	}
	// Fallback to 'dark' theme if no preference is found
	return "dark";
};
// -----------------------------

function AppContextProvider(props) {
	const rupee = "₹";
	const navigate = useNavigate();
	const endpointURL =
		import.meta.env.VITE_RENDER_BACKEND_URL ||
		import.meta.env.VITE_endpoint_BASE_URL;

	// State for search functionality
	const [currentState, setCurrentState] = useState("Sign In");
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(true);
	const [signedUp, setSignedUp] = useState(() => {
		const savedLogin = localStorage.getItem("signedUp");
		return savedLogin ? JSON.parse(savedLogin) : false;
	});
	const [expenses, setExpenses] = useState([]);

	// --- THEME STATE AND TOGGLE FUNCTION ---
	const [theme, setTheme] = useState(getInitialTheme);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme); // Persist the theme
			return newTheme;
		});
	};

	// Effect to apply the theme class to the document body
	useEffect(() => {
		document.body.className = ""; // Clear existing classes
		// Add the class based on the current theme state (e.g., 'dark-theme' or 'light-theme')
		document.body.classList.add(`${theme}-theme`);
	}, [theme]);
	// ---------------------------------------

	// Sync signedUp state with localStorage
	useEffect(() => {
		localStorage.setItem("signedUp", JSON.stringify(signedUp));
	}, [signedUp]);

	// Context value
	const value = {
		rupee,
		navigate,
		currentState,
		endpointURL,
		setCurrentState,
		signedUp,
		setSignedUp,
		setShowSearch,
		showSearch,
		expenses,
		setExpenses,
		search,
		setSearch,
		// --- ADD THEME VALUES HERE ---
		theme,
		toggleTheme,
		// -----------------------------
	};

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
}

export default AppContextProvider;