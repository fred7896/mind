import React from "react";

const Life = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			fill="none"
			viewBox="0 0 20 20"
			{...props}
		>
			<g fill="currentColor">
				<path d="M18.167 11.105L9.962 2.211l-8.205 8.894L9.962 20l8.205-8.895z"></path>
				<path d="M11.893 6.53c0 3.56-2.662 6.446-5.946 6.446C2.662 12.976 0 10.09 0 6.529 0 2.97 2.662.083 5.947.083c3.284 0 5.946 2.886 5.946 6.446z"></path>
				<path d="M20 6.447c0 3.56-2.662 6.446-5.947 6.446-3.284 0-5.946-2.886-5.946-6.446C8.107 2.887 10.769 0 14.053 0 17.338 0 20 2.886 20 6.447z"></path>
			</g>
		</svg>
	);
};

export default Life;
