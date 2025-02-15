import mongoose from "mongoose";

// Define the schema for the Expense model
const ExpenseSchema = new mongoose.Schema({
	title: { type: String, require: true }, // Title of the expense
	amount: { type: Number, require: true }, // Amount of the expense
	date: { type: Date, require: true }, // Date of the expense
	description: { type: String }, // Description of the expense
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true, // Reference to the user who made the expense
	},
});

// Export the Expense model
export default mongoose.model("Expense", ExpenseSchema);
