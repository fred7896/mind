import React from "react";

const Card = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80%"
			height="104%"
			fill="none"
			viewBox="0 0 80 104"
			{...props}
		>
			<path stroke="#D7F9FF" d="M0.5 0.5H79.5V103.5H0.5z"></path>
		</svg>
	);
};

export default Card;
