import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Title, CustomDatePicker, PromptCard } from "../Components";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-hot-toast";
import { reset } from "../Assets";

function Budget() {
	const { rupee, expenses, setExpenses, endpointURL } =
		useContext(AppContext);

	const [budget, setBudget] = useState({ total: 0 });
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [balanceLeft, setBalanceLeft] = useState(0);
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(null);
	const [description, setDescription] = useState("");
	const [showPrompt, setShowPrompt] = useState(false);
	const [isPromptVisible, setIsPromptVisible] = useState(false);

	// Fetch budget and expenses data when the component mounts
	useEffect(() => {
		fetchBudget();
		fetchExpenses();
	}, []);

	// Fetch budget data from the backend
	const fetchBudget = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`${endpointURL}/budget`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setBudget(response.data);
			calculateBalance(response.data.total, expenses);
		} catch (error) {
			console.error("Error fetching budget:", error);
			toast.error("Error fetching budget");
		}
	};

	// Fetch expenses data from the backend
	const fetchExpenses = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`${endpointURL}/expense`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setExpenses(response.data);
			calculateExpenseTotal(response.data);
			calculateBalance(budget.total, response.data);
		} catch (error) {
			console.error("Error fetching expenses:", error);
			toast.error("Error fetching expenses");
		}
	};

	// Calculate the total amount spent on expenses
	const calculateExpenseTotal = (expenses) => {
		const total = expenses.reduce(
			(sum, expense) => sum + expense.amount,
			0
		);
		setExpenseTotal(total);
	};

	// Calculate the remaining balance in the budget
	const calculateBalance = (budgetTotal, expenses) => {
		const totalExpenses = expenses.reduce(
			(sum, expense) => sum + expense.amount,
			0
		);
		setBalanceLeft(budgetTotal - totalExpenses);
	};

	// Handle form submission to add a new expense
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const newExpense = {
				title,
				amount: parseFloat(amount),
				date,
				description,
			};
			const response = await axios.post(
				`${endpointURL}/expense`,
				newExpense,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setExpenses([...expenses, response.data]);
			calculateExpenseTotal([...expenses, response.data]);
			calculateBalance(budget.total, [...expenses, response.data]);
			setTitle("");
			setAmount("");
			setDate(null);
			setDescription("");
			toast.success("Expense added successfully!");
		} catch (error) {
			console.error("Error adding expense:", error);
			toast.error("Error adding expense");
		}
	};

	// Handle updating the budget total
	const handleUpdateBalance = async (newBudgetTotal) => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				`${endpointURL}/budget`,
				{ total: parseFloat(newBudgetTotal) },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchBudget();
			toast.success("Budget updated successfully");
		} catch (error) {
			console.error("Error updating budget:", error);
			toast.error("Error updating budget");
		}
	};

	// Handle resetting the budget to its initial value
	const handleResetBudget = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				`${endpointURL}/budget/reset`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Budget reset successfully");
			fetchBudget();
		} catch (error) {
			console.error("Error resetting budget:", error);
			toast.error("Error resetting budget");
		}
	};

	return (
		<section>
			<div
				className={
					isPromptVisible
						? "backdrop-blur-sm transition duration-300 ease-in-out"
						: "transition duration-300 ease-in-out"
				}
			>
				<Title title={"Budget Overview"} />
				<div className="flex sm:justify-evenly justify-between items-center pb-3">
				<div className="flex items-center flex-col">
						<p className="font-semibold text-lg sm:text-xl">
							{rupee}
							{budget.total}
						</p>
						<p className="font-semibold text-lg">
							Balance Left
						</p>
					</div>
					<div className="flex items-center flex-col">
						<p className="font-semibold text-lg sm:text-xl">
							{rupee}
							{expenseTotal}
						</p>
						<p className="font-semibold text-lg">
							Expense Total
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center py-5 gap-[2px]">
					<button
						onClick={() => {
							setShowPrompt(true);
							setIsPromptVisible(true);
						}}
						className="text-secondary font-semibold bg-accent w-40 p-3 hover:scale-95 transition-all duration-300 cursor-pointer"
					>
						Update Balance
					</button>
					<div className="text-primary bg-secondary p-3 cursor-pointer">
						<img
							onClick={handleResetBudget}
							src={reset}
							alt="reset icon"
							className="w-6 hover:rotate-180 transition-all duration-300 cursor-pointer"
						/>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="pt-3 ">
				<div className="grid gap-3 justify-center">
					<input
						type="text"
						placeholder="Title"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 border-accent w-[360px] sm:w-[500px] max-w-md h-10 pl-3 outline-none"
					/>
					<div className="flex flex-row gap-3">
						<input
							type="number"
							placeholder="Amount"
							required
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="border-2 border-accent w-[200px] sm:w-[276px] h-10 pl-3 outline-none"
						/>
						<CustomDatePicker
							selectedDate={date}
							setSelectedDate={setDate}
						/>
					</div>
					<input
						type="text"
						placeholder="Description [Optional]"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border-2 border-accent w-[360px] sm:w-[500px] max-w-md h-20 pl-3 outline-none"
					/>
				</div>
				<div className="flex items-center justify-center pt-5">
					<button
						type="submit"
						className="text-secondary font-semibold bg-accent w-40 p-3 hover:scale-95 transition-all duration-300 cursor-pointer"
					>
						Add Expense
					</button>
				</div>
			</form>

			{showPrompt && (
				<div className="fixed inset-0 z-10 flex items-center justify-center bg-secondary/50 bg-opacity-50 backdrop-blur-sm transition duration-300 ease-in-out w-full h-full">
					<PromptCard
						onConfirm={(newBudgetTotal) => {
							handleUpdateBalance(newBudgetTotal);
							setShowPrompt(false);
							setIsPromptVisible(false);
						}}
						onCancel={() => {
							setShowPrompt(false);
							setIsPromptVisible(false);
						}}
					/>
				</div>
			)}
		</section>
	);
}

export default Budget;
