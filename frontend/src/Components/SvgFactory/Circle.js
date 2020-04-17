import React from "react";

const Circle = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			fill="none"
			viewBox="0 0 180 180"
			{...props}
		>
			<circle cx="90" cy="90" r="89.5" stroke="currentColor"></circle>
		</svg>
	);
};

export default Circle;
