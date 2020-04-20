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
		cardstate: [],
		cardsInPlayersHands: null,
		players: [],
		userId: "",
		myDeck: [],
		allPlayersCountCards : [],
		othersPlayersCountCards : []

	};

	componentDidMount() {
		this.getGameInfos();
		this.getUser();
		if (this.state.move === 0) {
			this.initLife();
			this.setCardGame();
		}
		if (this.state.cardgame.length > 0) {
			this.setCardState();
		}
		if (this.state.players.length > 0) {
			this.renderMyHand();
		}
		this.getCountCardHand();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.cardstate !== this.state.cardstate) {
			this.getCountCardHand();
			this.renderMyHand();
			this.renderTeammatesDeck();
		}
		if (prevState.players !== this.state.players && this.state.players.length > 0) {
			this.renderMyHand();
			this.renderTeammatesDeck();
		}
	}

	getUser = () => {
		let user = localStorage.getItem("USER");
		if (user === null) {
			this.props.history.push("/");
		} else {
			axios
				.get("http://localhost:4001/api/user", {
					params: {
						name: user
					}
				})
				.then(res => {
					if (res.data.length > 0) {
						this.setState({
							userId: res.data[0].id_user
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	getPlayers = () => {
		axios
			.get(`http://localhost:4001/api/usergame/game/${this.props.match.params.gameId}`)
			.then(res => {
				this.setState({
					players: res.data
				});
			});
	};

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
							console.log("getplayers");
							this.getGameInfos();
							this.getPlayers();
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
										console.log("create library...");
										axios
											.get(
												`http://localhost:4001/api/cardgame/game/${this.props.match.params.gameId}`
											)
											.then(res => {
												console.log(res.data);
												this.setState(
													{ cardgame: res.data },
													this.setCardState()
												);
											});
									});
							}
						}
					});
				} else {
					this.setState({ cardgame: res.data }, this.setCardState());
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

	getCountCardHand = () => {
		const cardsInPlayersHands = this.state.cardstate.filter(e => {
			return e.id_game_user !== null && e.id_slot === 2;
		});
		console.log(cardsInPlayersHands.length);
		this.setState({
			cardsInPlayersHands: cardsInPlayersHands.length
		});
	};

	drawCards = () => {
		for (let i = 0; i < this.state.turn; i++) {
			this.drawCard();
		}
	};

	drawCard = () => {
		const library = this.state.cardstate
			.filter(e => {
				return e.id_slot === 1;
			})
			.map(e => {
				return e.id_card_state;
			});

		for (let i = 0; i < this.state.players.length; i++) {
			let randomInteger = this.getRandomInt(library.length);
			let cardToDraw = library[randomInteger];

			let data = {
				id_slot: 2,
				id_game_user: this.state.players[i].id_user_game,
				move: this.state.move + 1
			};
			axios.put(`http://localhost:4001/api/cardstate/${cardToDraw}`, data).then(res => {
				this.setCardState();
			});
		}
	};

	getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	renderTeammatesDeck = () => {
		const othersPlayers = this.state.players
			.filter(e => {
				return e.id_user !== this.state.userId;
			})
			.map(e => {
				return { id_user_game: e.id_user_game, user_name: e.user_name };
			});
		//console.log(othersPlayers);
		const cardsInPlayersHand = this.state.cardstate.filter(e => {
			return e.id_slot == 2;
		});
		//console.log(cardsInPlayersHand);

		// Count Cards by id_game_user
		const result = [
			...cardsInPlayersHand
				.reduce((mp, o) => {
					if (!mp.has(o.id_game_user)) mp.set(o.id_game_user, { ...o, count: 0 });
					mp.get(o.id_game_user).count++;
					return mp;
				}, new Map())
				.values()
		].map(e => {
			return {
				id_user_game: e.id_game_user,
				countCard: e.count
			};
		});

		console.log(result);

		const allPlayersCountCards = this.state.players.map(player => {
			console.log(player);
			let countTab = result.filter(count =>  { return player.id_user_game == count.id_user_game });
			console.log(countTab);
			return {id_user_game : player.id_user_game , user_name : player.user_name, countCard : countTab[0].countCard }
		});

		const othersPlayersCountCards = othersPlayers.map(player => {
			console.log(player);
			let countTab = result.filter(count =>  { return player.id_user_game == count.id_user_game });
			console.log(countTab);
			return {id_user_game : player.id_user_game , user_name : player.user_name, countCard : countTab[0].countCard }
		});

		this.setState({
			allPlayersCountCards : allPlayersCountCards,
			othersPlayersCountCards : othersPlayersCountCards
		})

		//console.log(allPlayersCountCards);
		//console.log(othersPlayersCountCards);

	};

	renderMyHand = () => {
		let gameUser = this.state.players.filter(e => {
			return e.id_user == this.state.userId;
		});
		console.log(gameUser);
		if (gameUser.length > 0) {
			const cardInMyHand = this.state.cardstate.filter(e => {
				return e.id_slot == 2 && e.id_game_user == gameUser[0].id_user_game;
			});
			console.log(cardInMyHand);
			for (let i = 0; i < cardInMyHand.length; i++) {
				let value = cardInMyHand[i].id_card_game;
				axios.get(`http://localhost:4001/api/cardgame/value/${value}`).then(res => {
					console.log(res.data[0].id_card);
					if (!this.state.myDeck.includes(res.data[0].id_card)) {
						this.setState({
							myDeck: [...this.state.myDeck, res.data[0].id_card]
						});
					}
				});
			}
		}
	};

	displayMyDeck = () => {
		this.state.myDeck.map(e => {
			return (
				<div style={{ width: "90px" }} className="container-card mx-1">
					<SvgFactory iconname="card" />

					<div className="numero count-last">{e}</div>
				</div>
			);
		});
	};

	render() {
		// console.log(this.state.gameInfos);
		// console.log(this.state.cardgame);
		console.log(this.state.cardstate);
		// console.log(this.state.cardsInPlayersHands);
		// console.log(this.state.userId);
		console.log(this.state.players);
		// console.log(this.state.myDeck);
		return (
			<div className="container fontCyan boldLife game">
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
				<div>
					{this.state.cardsInPlayersHands === 0 && (
						<div onClick={this.drawCards}>DrawCards</div>
					)}
				</div>
				<div className="d-flex my-5">
				{this.state.othersPlayersCountCards.map(card => {
					return (
						<>
						<div className="container-deck">
						<SvgFactory iconname="deck" />

						<div className="count-deck">{card.countCard}</div>
						<div className="username">{card.user_name.toLowerCase()}</div>
					</div>
					
					</>
					)
				})}
				</div>

				<div className="d-flex justify-content-center align-items-center mb-5">
					<div style={{ width: "20%", opacity: "0.2" }} className="container-circle mx-1">
						<SvgFactory iconname="circle" />

						<div className="numero count-last">2</div>
					</div>
					<div style={{ width: "60%" }} className="container-circle mx-2">
						<SvgFactory iconname="circle" />

						{/* <div className="numero count-main">2</div> */}
						<div className="numero">
							<img src={require("../runner_start.svg")} width="100%" />
						</div>
					</div>
					<div style={{ width: "20%" }} className="container-circle mustard mx-1">
						<SvgFactory iconname="circle" />

						<div className="numero">
							<SvgFactory iconname="shuriken" />
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					{this.state.myDeck.map((e, idx) => {
						return (
							<div
								key={idx}
								style={{ width: "90px" }}
								className="container-card mx-1"
							>
								<SvgFactory iconname="card" />

								<div className="numero count-last">{e}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
