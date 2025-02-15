import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker component
import { calender } from "../Assets"; // Import calendar image

function CustomDatePicker({ setSelectedDate, selectedDate }) {
	return (
		<div className="relative">
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				placeholderText="Select a date"
				popperPlacement="bottom-end"
				dateFormat="dd-MM-yyyy"
				dateFormatCalendar="LLLL YYYY"
				className="border-2 outline-none border-accent w-[148px] sm:w-[160px] h-10 pl-3"
			/>
			<img
				src={calender}
				alt="calender"
				className="w-8 absolute top-1 right-1"
			/>
		</div>
	);
}

export default CustomDatePicker;
