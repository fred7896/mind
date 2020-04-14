import React from "react";
import "../Components/Home/Home.scss";
import "../global.scss";
import "./Game.scss";
import SvgFactory from "../Components/SvgFactory/SvgFactory";

export default class Game extends React.Component {

    state = {
        life : 3,
        shuriken : 2,
        turn : 1

    }
	render() {
		return (
			<div className="container fontCyan boldLife">
				<div className="d-flex my-3">
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ width: "33.3%" }}
					>
						<div className="mr-1">
							<SvgFactory iconname="mind" width="20px" height="20px" />
						</div>
						<div>{this.state.turn}/5</div>
					</div>
					<div
						className="d-flex justify-content-center align-items-center mustard"
						style={{ width: "33.3%" }}
					>
						<div className="mr-1">
							<SvgFactory iconname="shuriken" width="20px" height="20px" />
						</div>
						<div>{this.state.shuriken}</div>
					</div>
					<div
						className="d-flex justify-content-center align-items-center salsa"
						style={{ width: "33.3%" }}
					>
						<div className="mr-1">
							<SvgFactory iconname="life" width="20px" height="20px" />
						</div>
						<div>{this.state.life}</div>
					</div>
				</div>
			</div>
		);
	}
}
