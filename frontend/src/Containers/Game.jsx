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
		move: 0,
		cardgame: [],
		cardstate : []
	};

	componentDidMount() {
		this.getGameInfos();
		if (this.state.move === 0) {
			this.initLife();
			this.setCardGame();
			this.setCardState();
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
					let data = {
						life: res.data.length
					};
					axios
						.put(
							`http://localhost:4001/api/game/${this.props.match.params.gameId}`,
							data
						)
						.then(res => {
							this.getGameInfos();
						});
				}
			})
			.catch(error => {
				console.log(error);
			});

		console.log("init game ...");
	};

	setCardGame = () => {
		axios
			.get(`http://localhost:4001/api/cardgame/game/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length === 0) {
					axios.get(`http://localhost:4001/api/card/all`).then(res => {
						if (res.data.length > 0) {
							console.log(res.data);
							for (let i = 0; i < res.data.length; i++) {
								axios
									.post(
										"http://localhost:4001/api/cardgame",
										{
											id_card: res.data[i].idcard,
											id_game: this.props.match.params.gameId
										},
										{
											headers: {
												Accept: "application/json"
											}
										}
									)
									.then(res => {
										this.setState({
											move: this.state.move + 1
										});
										console.log("create library...");
										axios
											.get(
												`http://localhost:4001/api/cardgame/game/${this.props.match.params.gameId}`
											)
											.then(res => {
												console.log(res.data);
												this.setState({ cardgame: res.data });
											});
									});
							}
						}
					});
				} else {
					this.setState({ cardgame: res.data });
				}
			});
	};

	setCardState = () => {
		axios
			.get(`http://localhost:4001/api/cardstate/game/${this.props.match.params.gameId}`)
			.then(res => {
				console.log(res.data);
				if (res.data.length === 0) {
					for (let i = 0; i < this.state.cardgame.length; i++) {
						axios
							.post(
								"http://localhost:4001/api/cardstate",
								{
									id_card_game: this.state.cardgame[i].id_card_game,
									id_slot: 1,
									move: this.state.move + 1
								},
								{
									headers: {
										Accept: "application/json"
									}
								}
							)
							.then(res => console.log(res));
					}
				} else {
					this.setState({
						cardstate: res.data
					});
				}
			});
	};

	render() {
		console.log(this.state.gameInfos);
		console.log(this.state.cardgame);
		console.log(this.state.cardstate);
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
