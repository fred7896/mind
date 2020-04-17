import React from "react";

const Deck = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="85%"
			height="93%"
			fill="none"
			viewBox="0 0 85 93"
			{...props}
		>
			<path
				fill="#D7F9FF"
				stroke="#D7F9FF"
				d="M0.641 20.136H57.641V96.136H0.641z"
				transform="rotate(-20 .64 20.136)"
			></path>
			<path fill="#000C26" stroke="#D7F9FF" d="M26.919 14.097H83.919V90.097H26.919z"></path>
		</svg>
	);
};

export default Deck;
