import React, { useState } from "react";

// PromptCard component
function PromptCard({ onConfirm, onCancel }) {
	const [newBudget, setNewBudget] = useState("");

	// Handle confirm button click
	const handleConfirm = () => {
		if (newBudget && !isNaN(newBudget)) {
			onConfirm(parseFloat(newBudget));
		} else {
			alert("Please enter a valid number.");
		}
	};

	return (
		<div className="bg-primary w-[450px] border-2 border-accent grid grid-cols-6 gap-2 py-3 px-5 text-sm">
			<h1 className="text-center text-secondary text-xl font-bold col-span-6">
				Update Budget
			</h1>
			<input
				type="number"
				placeholder="Enter new budget total"
				value={newBudget}
				onChange={(e) => setNewBudget(e.target.value)}
				className="text-slate-600 placeholder:text-secondary placeholder:opacity-50 border border-accent col-span-6 resize-none outline-none p-2 transition-all duration-300 appearance-none"
			/>
			<span className="col-span-2"></span>
			<button
				onClick={handleConfirm}
				className="border-2 border-accent/30 col-span-2 flex justify-center p-2 duration-300 transition-all hover:bg-accent/20 hover:text-accent"
			>
				Confirm
			</button>
			<button
				onClick={onCancel}
				className="border-2 border-accent/30 col-span-2 flex justify-center p-2 duration-300 transition-all hover:bg-accent/20 hover:text-accent"
			>
				Cancel
			</button>
		</div>
	);
}

export default PromptCard;
