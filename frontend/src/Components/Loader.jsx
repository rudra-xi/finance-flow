import React from "react";

// Loader component to show a loading spinner and message
function Loader() {
	return (
		<div className="w-full h-[59vh] flex items-center justify-center">
			<div className="text-center">
				<div className="loader">
					<svg viewBox="0 0 80 80">
						<circle r="32" cy="40" cx="40"></circle>
					</svg>
				</div>
				<h2 className="text-accent text-xl font-bold mt-4">
					Please wait...
				</h2>
				<p className="text-secondary text-2xl font-extrabold">
					We're preparing your budget overview.
				</p>
			</div>
		</div>
	);
}

export default Loader;
