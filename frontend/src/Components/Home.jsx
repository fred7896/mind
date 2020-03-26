import React from "react";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };

	}

	handleChange = (event) => {
		this.setState({ value: event.target.value });
	}

	render() {
		return (
			<div className="container">
				<form className="my-5">
					<input
						type="text"
						placeholder="name"
						value={this.state.value}
						onChange={this.handleChange}
					/>

					<div>
						<div>Create</div>
						<div>Join</div>
					</div>
				</form>
			</div>
		);
	}
}
