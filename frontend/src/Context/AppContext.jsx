import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const AppContext = createContext();

function AppContextProvider(props) {
	const rupee = "₹";
	const navigate = useNavigate();
	const endpointURL = import.meta.env.VITE_endpoint_BASE_URL;

	// State for search functionality
	const [currentState, setCurrentState] = useState("Sign In");
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(true);
	const [signedUp, setSignedUp] = useState(() => {
		const savedLogin = localStorage.getItem("signedUp");
		return savedLogin ? JSON.parse(savedLogin) : false;
	});

	const [expenses, setExpenses] = useState([]);

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
	};

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
}

export default AppContextProvider;
