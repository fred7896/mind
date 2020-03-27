import React from "react";
import "./Home.scss";
import SvgFactory from "../SvgFactory/SvgFactory";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	render() {
		return (
			<div className="container fontCyan">
				<div className="d-flex justify-content-center align-items-center mindBox">
					<div style={{ width: "165px", height: "165px" }}>
						<SvgFactory iconname="mind" />
					</div>
				</div>
				<form className="inputBox">
					<input
						type="text"
						placeholder="name"
						className="cyanAndTransparent nameInput my-2"
						value={this.state.value}
						onChange={this.handleChange}
					/>

					<div className="nameInput inputBox imperialButton my-2">CREATE</div>
					<div className="nameInput inputBox salsaButton my-2">JOIN</div>
				</form>
			</div>
		);
	}
}
