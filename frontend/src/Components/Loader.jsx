import React from "react";

// Loader component to show a loading spinner and message
function Loader() {
	return (
		<div>
			<div className="text-center">
				<div className="w-16 h-16 border-6 border-dotted rounded-full animate-loader border-accent mx-auto"></div>
				<h2 className="text-secondary mt-4">Loading...</h2>
				<p className="text-accent">
					Taking you to your budget overview
				</p>
			</div>
		</div>
	);
}

export default Loader;
