// Import React library
import React from "react";

// Define a functional component for displaying a title
function Title({ title }) {
    // Return JSX for the component
    return (
        <div className="flex flex-col text-center items-center justify-center pb-10">
            <div className="text-5xl font-black">{title}</div>
        </div>
    );
}

// Export the Title component for use in other files
export default Title;
