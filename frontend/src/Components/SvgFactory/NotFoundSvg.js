import React from "react";

const NotFoundSvg = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			fill="none"
			viewBox="0 0 50 50"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M45.094 35.924c.581.316 1.312.101 1.598-.495A24.03 24.03 0 0010.11 6.193L7.222 4.171a.75.75 0 00-1.178.675l.564 6.886a.75.75 0 00.946.663l6.663-1.826a.75.75 0 00.232-1.338l-2.28-1.597a21.633 21.633 0 0132.414 26.65c-.283.598-.07 1.324.511 1.64zM14.97 44.308a21.471 21.471 0 01-1.638-.985 1.274 1.274 0 00-1.41 2.123c.594.395 1.206.763 1.832 1.103a1.275 1.275 0 001.216-2.24zm7.213 2.332a1.274 1.274 0 10-.314 2.53c.706.087 1.42.142 2.14.162a1.274 1.274 0 00.07-2.548 19.75 19.75 0 01-1.896-.144zM5.758 39.595a1.274 1.274 0 102.044-1.523 22.574 22.574 0 01-1.079-1.584 1.274 1.274 0 10-2.165 1.344c.376.606.776 1.194 1.2 1.763zm25.808 5.965a1.274 1.274 0 10.862 2.399c.659-.237 1.318-.506 1.974-.807a1.275 1.275 0 10-1.062-2.317 22.56 22.56 0 01-1.774.725zM1.37 29.956a1.275 1.275 0 002.492-.538c-.134-.62-.242-1.249-.323-1.886a1.275 1.275 0 00-2.529.32c.09.712.211 1.413.36 2.104zm38.4 10.652a1.274 1.274 0 101.678 1.919c.265-.232.53-.47.792-.715a1.274 1.274 0 10-1.737-1.865c-.243.226-.488.447-.733.661zM1.384 19.373a1.275 1.275 0 002.493.533c.067-.313.14-.627.222-.942a1.274 1.274 0 10-2.47-.634c-.089.349-.17.696-.245 1.043z"
				clipRule="evenodd"
			></path>
		</svg>
	);
};

export default NotFoundSvg;
