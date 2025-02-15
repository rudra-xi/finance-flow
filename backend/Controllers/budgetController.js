import Budget from "../Models/Budget.js";

const currentBudget = async (req, res) => {
	try {
		let budget = await Budget.findOne({ user: req.userId });

		// If no budget exists, create a default one
		if (!budget) {
			budget = new Budget({ total: 0, user: req.userId });
			await budget.save();
		}

		res.status(200).json(budget);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updateBudget = async (req, res) => {
	const { total } = req.body;
	try {
		let budget = await Budget.findOne({ user: req.userId }); // Find budget for the logged-in user
		if (budget) {
			budget.total += total; // Update the budget total
		} else {
			budget = new Budget({ total, user: req.userId }); // Create a new budget for the user
		}

		await budget.save();
		res.status(201).json({
			message: "Updated Budget.",
			status: true,
			budget,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const resetBudget = async (req, res) => {
	try {
		let budget = await Budget.findOne({ user: req.userId }); // Find budget for the logged-in user
		if (budget) {
			budget.total = 0; // Reset budget to zero
			await budget.save();
		} else {
			budget = new Budget({ total: 0, user: req.userId }); // Create a new budget for the user
			await budget.save();
		}
		res.status(200).json({
			message: "Budget reset successfully",
			status: true,
			budget,
		});
	} catch (err) {
		res.status(500).json({ message: err.message, status: false });
	}
};

export { currentBudget, updateBudget, resetBudget };
