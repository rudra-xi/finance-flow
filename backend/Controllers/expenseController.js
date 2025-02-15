import Expense from "../Models/Expense.js";
import Budget from "../Models/Budget.js";

const allExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find({ user: req.userId }); // Find expenses for the logged-in user
		res.status(200).json(expenses);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const newExpenses = async (req, res) => {
	const { title, amount, date, description } = req.body;
	try {
		const newExpense = new Expense({
			title,
			amount,
			date,
			description,
			user: req.userId, // Associate the expense with the logged-in user
		});
		await newExpense.save();

		// Update the user's budget
		const budget = await Budget.findOne({ user: req.userId });
		if (budget) {
			budget.total -= amount;
			await budget.save();
		}
		res.status(201).json({
			message: "Expense Saved Successfully!",
			status: true,
			newExpense,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const deleteExpenses = async (req, res) => {
	try {
		const expense = await Expense.findById(req.params.id);
		if (!expense) {
			return res.status(404).json({ message: "Expense not found." });
		}

		// Ensure the expense belongs to the logged-in user
		if (expense.user.toString() !== req.userId) {
			return res.status(403).json({ message: "Unauthorized access." });
		}

		// Update the user's budget
		const budget = await Budget.findOne({ user: req.userId });
		if (budget) {
			budget.total += expense.amount;
			await budget.save();
		}

		await Expense.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Expense deleted successfully!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export { allExpenses, newExpenses, deleteExpenses };
