import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ItemsCard, SearchBar, Title } from "../Components";
import { toast } from "react-hot-toast";
import { AppContext } from "../Context/AppContext";

function Expense() {
	const { expenses, setExpenses, endpointURL } = useContext(AppContext);

	const [filteredExpenses, setFilteredExpenses] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("new");

	useEffect(() => {
		fetchExpenses();
	}, []);

	// Fetch expenses from the backend and update the state
	const fetchExpenses = async () => {
		try {
			// Retrieve the token from local storage
			const token = localStorage.getItem("token");

			// Make a GET request to the backend API with the token in the headers
			const response = await axios.get(`${endpointURL}/endpoint/expense`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Update the expenses state with the fetched data
			setExpenses(response.data);
			setFilteredExpenses(response.data); // Also update the filtered expenses state
		} catch (error) {
			console.error("Error fetching expenses:", error);
			toast.error("Error fetching expenses");
		}
	};

	// Handle search input change
	const handleSearch = (query) => {
		setSearchQuery(query);

		// Filter the expenses based on the search query
		const filtered = expenses.filter((expense) =>
			expense.title.toLowerCase().includes(query.toLowerCase())
		);

		// Update the filtered expenses state
		setFilteredExpenses(filtered);
	};

	// Handle sort option change
	const handleSort = (option) => {
		setSortOption(option);

		// Create a copy of the filtered expenses
		let sortedExpenses = [...filteredExpenses];

		// Sort the expenses based on the selected option
		switch (option) {
			case "date":
				sortedExpenses.sort(
					(a, b) => new Date(a.date) - new Date(b.date)
				);
				break;
			case "amount-asc":
				sortedExpenses.sort((a, b) => a.amount - b.amount);
				break;
			case "amount-desc":
				sortedExpenses.sort((a, b) => b.amount - a.amount);
				break;
			default:
				sortedExpenses.sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				);
				break;
		}

		// Update the filtered expenses state with the sorted expenses
		setFilteredExpenses(sortedExpenses);
	};

	// Handle deletion of an expense
	const handleDeleteExpense = async (id) => {
		try {
			// Retrieve the token from local storage
			const token = localStorage.getItem("token");

			// Make a DELETE request to the backend API with the token in the headers
			await axios.delete(`${endpointURL}/endpoint/expense/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Refresh the expenses list after deletion
			fetchExpenses();

			// Show a success toast message
			toast.success("Expense deleted successfully");
		} catch (error) {
			console.error("Error deleting expense:", error);
			toast.error("Error deleting expense");
		}
	};

	return (
		<section>
			<Title title={"Expense Details"} />
			<div className="sm:flex sm:flex-row flex-col items-center justify-center gap-3">
				<div className="flex items-center justify-center">
					<SearchBar onSearch={handleSearch} />{" "}
					{/* Pass handleSearch as a prop */}
				</div>
				<div className="sm:mt-0 mt-5 flex justify-center">
					<select
						value={sortOption}
						onChange={(e) => handleSort(e.target.value)}
						className="flex border-2 bg-primary outline-none border-accent text-sm p-2 h-10"
					>
						<option value="new">Newest</option>
						<option value="date">Sort by Date</option>
						<option value="amount-asc">
							Amount: Low to High
						</option>
						<option value="amount-desc">
							Amount: High to Low
						</option>
					</select>
				</div>
			</div>

			<div className="pt-10 flex flex-wrap gap-5 justify-center items-center">
				{filteredExpenses.map((item) => (
					<ItemsCard
						key={item._id}
						id={item._id}
						title={item.title}
						amount={item.amount}
						date={item.date}
						description={item.description}
						onDelete={handleDeleteExpense}
					/>
				))}
			</div>
		</section>
	);
}

export default Expense;
