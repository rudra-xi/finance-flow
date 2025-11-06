import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { bin } from "../Assets";

function ItemsCard({ title, date, amount, description, onDelete, id }) {
	const { rupee } = useContext(AppContext);

	// Function to format the date
	const formatDate = (isoDate) => {
		const dateObj = new Date(isoDate);
		return dateObj.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="w-[400px] h-44 p-2 drop-shadow-custom border-y border-accent">
			<div className="flex flex-col px-5 pt-3">
				<h2 className="text-3xl font-bold capitalize">{title}</h2>
				<p className="font-medium text-sm pr-6 capitalize pt-2">
					{description}
				</p>
				<p className="font-semibold bottom-5 absolute text-accent/70">
					{formatDate(date)}
				</p>
				<img
					src={bin}
					alt="bin"
					className="w-6 absolute right-5 top-6 hover:scale-110 transition-all duration-300 cursor-pointer"
					onClick={() => onDelete(id)} // Add onClick handler for delete
				/>
				<p className="absolute bottom-3 right-5 text-2xl font-extrabold underline-offset-4">
					{rupee}
					{amount}
				</p>
			</div>
		</div>
	);
}

export default ItemsCard;
