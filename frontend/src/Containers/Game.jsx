import React from "react";
import axios from "axios";
import "../Components/Home/Home.scss";
import "../global.scss";
import "./Game.scss";
import SvgFactory from "../Components/SvgFactory/SvgFactory";

export default class Game extends React.Component {
	state = {
		life: 1,
		shuriken: 1,
		turn: 1,
		gameInfos: [],
		move: 0
	};

	componentDidMount() {
		this.getGameInfos();
		if (this.state.move === 0) {
			this.initLife();
		}
	}

	getGameInfos = () => {
		axios
			.get(`http://localhost:4001/api/game/all/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
						gameInfos: res.data,
						life: res.data[0].life,
						shuriken: res.data[0].shuriken,
						turn: res.data[0].turn,
						move: res.data[0].move
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	initLife = () => {
		axios
			.get(`http://localhost:4001/api/usergame/game/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length > 0) {
					console.log(res.data);
					let data = {
						life: res.data.length
					};
					axios
						.put(
							`http://localhost:4001/api/game/${this.props.match.params.gameId}`,
							data
						)
						.then(res => {
							console.log(res);
							this.getGameInfos();
						});
				}
			})
			.catch(error => {
				console.log(error);
			});

		console.log("init game ...");
	};
	render() {
		console.log(this.state.gameInfos);
		console.log(this.state.life);
		return (
			<div className="container fontCyan boldLife">
				<div className="d-flex my-3">
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ width: "33.3%" }}
					>
						<div className="mr-2">
							<SvgFactory iconname="mind" width="20px" height="20px" />
						</div>
						<div>{this.state.turn}/5</div>
					</div>
					<div
						className="d-flex justify-content-center align-items-center mustard"
						style={{ width: "33.3%" }}
					>
						<div className="mr-2">
							<SvgFactory iconname="shuriken" width="20px" height="20px" />
						</div>
						<div>{this.state.shuriken}</div>
					</div>
					<div
						className="d-flex justify-content-center align-items-center salsa"
						style={{ width: "33.3%" }}
					>
						<div className="mr-2">
							<SvgFactory iconname="life" width="20px" height="20px" />
						</div>
						<div>{this.state.life}</div>
					</div>
				</div>
			</div>
		);
	}
}
