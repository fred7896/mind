import React from "react";
import axios from "axios";
import "../Components/Home/Home.scss";
import "../global.scss";
import "./Game.scss";
import SvgFactory from "../Components/SvgFactory/SvgFactory";
import Card from "../Components/Card";
import DustBin from "../Components/DustBin";

/*
* game_status
* 0 : la partie vient juste d'être créée. le createur doit valider la partie avant de partager le code.
* 1 : le créateur vient de cliquer sur Go pour lancer la partie
* 2 :  
*/

export default class Game extends React.Component {
	state = {
		life: 1,
		shuriken: 1,
		turn: 0,
		gameInfos: [],
		game_status: null,
		move: 0,
		cardgame: [],
		cardstate: [],
		cardsInPlayersHands: null,
		players: [],
		userId: "",
		myDeck: [],
		allPlayersCountCards: [],
		othersPlayersCountCards: [],
		dustBin: []
	};

	componentDidMount() {
		this.getGameInfos();
		if (this.state.userId === "") {
			this.getUser();
		}
		if (this.state.players.length === 0) {
			this.getPlayers();
		}
		if (this.state.cardgame.length > 0) {
			this.setCardState();
		}
		if (this.state.players.length > 0 && this.state.game_status > 1) {
			this.getCards();
			if (this.state.cardstate.length > 0 && this.state.turn > 0) {
				this.renderMyHand();
				this.renderTeammatesDeck();
				this.renderBin();
			}
		}
		if (this.state.game_status > 1) {
			this.getCountCardHand();
		}

	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.players !== this.state.players && this.state.players.length > 0) {
			this.getCards();
			if (this.state.cardstate.length > 0 && this.state.turn > 0) {
				this.renderMyHand();
				this.renderTeammatesDeck();
			}
		}
		if (prevState.cardstate !== this.state.cardstate && this.state.cardstate.length > 0) {
			this.getCountCardHand();
			if (this.state.turn > 0) {
				this.renderMyHand();
				this.renderBin();
				this.renderTeammatesDeck();
			}
		}
		if (prevState.game_status !== this.state.game_status) {
			this.getGameInfos();
		}
		if (prevState.turn !== this.state.turn) {
			this.getGameInfos();
		}
	}

	initGame = () => {
		console.log("init game ...");
		this.getLife();
		this.setCardGame();
		this.createLibrary();
		if (this.state.cardstate.length > 0) {
			this.finishStepOne();
		} else {
			this.setCardState();
		}

	}

	handleStart = () => {
		this.initGame();
	}

	updateGame = () => {

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
						game_status: res.data[0].game_status,
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




	getLife = () => {
		axios
			.get(`http://localhost:4001/api/usergame/game/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
						players: res.data
					});
					let data = {
						life: res.data.length
					};
					axios
						.put(
							`http://localhost:4001/api/game/${this.props.match.params.gameId}`,
							data
						)
						.then(res => {
							console.log("lives calculated...");
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	setCardGame = () => {
		console.log("create cards...");
		axios
			.get(`http://localhost:4001/api/cardgame/game/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length === 0 && this.state.game_status <= 1) {
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
										console.log(res);
										console.log("create card...");
									});
							}

						}
					});
				} else {
					this.setState({ cardgame: res.data }, this.setCardState());
				}
			});
	};

	getCards = () => {
		console.log("get cards game");
		axios
			.get(
				`http://localhost:4001/api/cardgame/game/${this.props.match.params.gameId}`
			)
			.then(res => {
				console.log(res.data);
				this.setState(
					{ cardgame: res.data },
					this.getCardState()
				);
			});
	}

	getCardState = () => {
		console.log("get cards state");
		axios
			.get(`http://localhost:4001/api/cardstate/game/${this.props.match.params.gameId}`).then(res => {
				console.log(res);
				this.setState({
					cardstate: res.data
				});
			})
	}

	createLibrary = () => {
		console.log("Create library...")
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
	}

	finishStepOne = () => {
		console.log("finishStepOne...");
		let data = {
			game_status: 2
		};
		axios
			.put(`http://localhost:4001/api/game/${this.props.match.params.gameId}`, data)
			.then(res => {
				console.log(res);
			});
	}

	setCardState = () => {
		console.log("Set card state...");
		axios
			.get(`http://localhost:4001/api/cardstate/game/${this.props.match.params.gameId}`)
			.then(res => {
				console.log(res.data);
				if (res.data.length === 0 && this.state.game_status <= 1) {
					for (let i = 0; i < this.state.cardgame.length; i++) {
						console.log(this.state.cardgame.length);
						axios
							.post(
								"http://localhost:4001/api/cardstate",
								{
									id_card_game: this.state.cardgame[i].id_card_game,
									id_slot: 1
								},
								{
									headers: {
										Accept: "application/json"
									}
								}
							)
							.then(res => console.log(res))
							.catch(error => {
								if (error.response.status === 409) {
									this.finishStepOne();
								}
							});
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
		let newTurn = this.state.turn + 1;
		for (let i = 0; i < newTurn; i++) {
			this.drawCard();
		}
		let data = {
			turn: newTurn
		};
		axios
			.put(`http://localhost:4001/api/game/${this.props.match.params.gameId}`, data)
			.then(res => {
				console.log(res);
				this.getGameInfos();
			});
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
				this.getCardState();
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

		// const allPlayersCountCards = this.state.players.map(player => {
		// 	// console.log(player);
		// let countTab = result.filter(count => {
		// 	return player.id_user_game == count.id_user_game;
		// });
		// 	// console.log(countTab);
		// 	return {
		// 		id_user_game: player.id_user_game,
		// 		user_name: player.user_name,
		// 		countCard: countTab[0].countCard
		// 	};
		// });

		const othersPlayersCountCards = othersPlayers.map(player => {
			// console.log(player);
			let countTab = result.filter(count => {
				return player.id_user_game == count.id_user_game;
			});
			if (countTab.length > 0) {
				return {
					id_user_game: player.id_user_game,
					user_name: player.user_name,
					countCard: countTab[0].countCard
				};
			} else {
				return {
					id_user_game: player.id_user_game,
					user_name: player.user_name,
					countCard: 0
				};
			}
			// console.log(countTab);

		});

		this.setState({
			//allPlayersCountCards: allPlayersCountCards,
			othersPlayersCountCards: othersPlayersCountCards
		});

	};

	renderMyHand = () => {
		console.log("render my hand...");
		let gameUser = this.state.players.filter(e => {
			return e.id_user == this.state.userId;
		});
		// console.log(gameUser);
		if (gameUser.length > 0) {
			const cardInMyHand = this.state.cardstate.filter(e => {
				return e.id_slot == 2 && e.id_game_user == gameUser[0].id_user_game;
			});
			console.log(Array.isArray(cardInMyHand));
			for (let i = 0; i < cardInMyHand.length; i++) {
				let idCardGame = cardInMyHand[i].id_card_game;
				let superCard = cardInMyHand[i].id_card_state;
				axios.get(`http://localhost:4001/api/cardgame/value/${idCardGame}`).then(res => {
					let result = {};
					result = { "idCardState": superCard, "value": res.data[0].id_card };
					this.setState({
						myDeck: [...this.state.myDeck, result]
					});

				});
			}

		}
	};

	removeDuplicate = (arr) => {
		const filteredArr = arr.reduce((acc, current) => {
			const x = acc.find(item => item.idCardState === current.idCardState);
			if (!x) {
				return acc.concat([current]);
			} else {
				return acc;
			}
		}, []);

		return filteredArr;
	};


	renderBin = () => {
		this.setState({
			dustBin: []
		});
		let dustBin = this.state.cardstate.filter(card => {
			return card.id_slot === 3
		});
		//console.log(dustBin);
		for (let i = 0; i < dustBin.length; i++) {
			let value = dustBin[i].id_card_game;
			console.log(value);
			axios.get(`http://localhost:4001/api/cardgame/value/${value}`).then(res => {
				console.log(res.data[0].id_card);
				console.log(dustBin[i].id_card_state);
				this.setState({
					dustBin: [...this.state.dustBin, { "idCardState": dustBin[i].id_card_state, "value": res.data[0].id_card }]
				});
			});

		}

	}

	fromHandToBin = idCardState => {
		// this.setState({
		// 	myDeck: []
		// });
		let gameUser = this.state.players.filter(e => {
			return e.id_user == this.state.userId;
		});
		let data = {
			id_slot: 3,
			id_game_user: gameUser.id_user_game,
			move: this.state.move + 1
		};
		axios.put(`http://localhost:4001/api/cardstate/${idCardState}`, data).then(res => {
			this.getCardState();
		});
	}

	render() {
		console.log(this.state.turn);
		//console.log(this.state.gameInfos);
		// console.log(this.state.cardgame);
		console.log(this.state.cardstate);
		// console.log(this.state.cardsInPlayersHands);
		// console.log(this.state.userId);
		//console.log(this.state.players);
		console.log(this.state.myDeck.length);
		console.log(this.state.myDeck);
		// console.log(this.state.dustBin);
		console.log(this.state.game_status);
		let decky = this.removeDuplicate(this.state.myDeck);
		console.log(decky);
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
					{this.state.othersPlayersCountCards && this.state.othersPlayersCountCards.map(card => {
						return (
							<div key={card.id_user_game} className="container-deck">
								<SvgFactory iconname="deck" />

								<div className="count-deck">{card.countCard}</div>
								<div className="username">{card.user_name.toLowerCase()}</div>
							</div>
						);
					})}
				</div>

				<div className="d-flex justify-content-center align-items-center mb-5">
					<div
						style={{ width: "20%", opacity: "0.2", maxWidth: "150px" }}
						className="container-circle mx-1 mx-md-3"
					>
						<SvgFactory iconname="circle" />

						<div className="numero count-last">{this.state.dustBin.length >= 2 ? this.state.dustBin[this.state.dustBin.length - 2].value : "/"}</div>
					</div>
					<DustBin lastValue={this.state.dustBin.slice(-1)} handleStart={this.handleStart} turn={this.state.turn} gameStatus={this.state.game_status}/>
					<div
						style={{ width: "20%", maxWidth: "150px" }}
						className="container-circle mustard mx-1 mx-md-3"
					>
						<SvgFactory iconname="circle" />

						<div className="numero">
							<SvgFactory iconname="shuriken" />
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					{decky.map((e, idx) => {
						return <Card key={idx} cardValue={e.value} idCardState={e.idCardState} fromHandToBin={this.fromHandToBin} />;
					})}
				</div>
			</div>
		);
	}
}
