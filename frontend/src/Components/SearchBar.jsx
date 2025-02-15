import React from "react";
import { search_icon } from "../Assets";

// SearchBar component
function SearchBar({ onSearch }) {
	return (
		<div className="text-center">
			<div className="inline-flex items-center justify-center text-sm border-2 border-accent w-80 sm:w-96 px-5 h-10">
				<input
					type="text"
					placeholder="Search"
					onChange={(e) => onSearch(e.target.value)} // Call onSearch when the input changes
					className="flex-1 outline-none bg-inherit text-sm"
				/>
				<img src={search_icon} alt="search icon" className="w-5" />
			</div>
		</div>
	);
}

export default SearchBar;
