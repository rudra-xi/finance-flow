import mongoose from "mongoose";

// Define the Budget schema
const BudgetSchema = new mongoose.Schema({
	// Total budget amount
	total: {
		type: Number,
		required: true,
	},
	// Reference to the user who owns the budget
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

// Export the Budget model
export default mongoose.model("Budget", BudgetSchema);
