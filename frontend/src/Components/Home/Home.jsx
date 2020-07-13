import React from "react";
import "./Home.scss";
import SvgFactory from "../SvgFactory/SvgFactory";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			joinCode: "",
			displayNameField: false,
			userId: "",
			insertCode: "",
			joinedGame: []
		};
	}

	componentDidMount() {
		this.getUser();
		this.setJoinCode(7);
	}

	handleInputChange = event => {
		const value = event.target.value.toUpperCase();
		const name = event.target.name;

		this.setState({
			[name]: value
		});
	};

	changeName = event => {
		this.setState({ username: event.target.value.toUpperCase() });
	};

	changeCode = event => {
		this.setState({ insertCode: event.target.value.toUpperCase() });
	};

	getUser = () => {
		let user = localStorage.getItem("USER");
		if (user === null) {
			this.setState({
				displayNameField: true
			});
		} else {
			this.setState({
				username: user
			});
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
					Swal.fire("Erreur", "la recupération de l'id du user a échoué", "error");
				});
		}
	};

	setUser = () => {
		if (this.state.username.length === 0) {
			Swal.fire("Erreur", "champ de saisie vide", "error");
		} else {
			axios
				.post(
					"http://localhost:4001/api/user",
					{
						name: this.state.username
					},
					{
						headers: {
							Accept: "application/json"
						}
					}
				)
				.then(() => {
					Swal.fire("Utilisateur créé", `Nom : ${this.state.username}`, "success").then(
						() => {
							document.location.reload(true);
						}
					);
					localStorage.setItem("USER", this.state.username);
					this.getUser();
				})
				.catch(error => {
					if (error.response.status === 409) {
						Swal.fire("Erreur", "nom d'utilisateur déjà utilisé", "error");
					} else {
						Swal.fire("Erreur", "la création du user a échoué", "error");
					}
				});
		}
	};

	createGame = () => {
		console.log(this.state.joinCode);
		axios
			.post(
				"http://localhost:4001/api/game",
				{
					shared_code: this.state.joinCode.toUpperCase(),
					created_by: this.state.userId,
					game_status: 0
				},
				{
					headers: {
						Accept: "application/json"
					}
				}
			)
			.then(response => {
				Swal.fire(`${this.state.joinCode}`, "Share this code", "success");
				this.props.history.push(`/games/user/${this.state.userId}`);
			})
			.catch(error => {
				Swal.fire("Erreur", "Votre partie n'a pas pu être créée", "error");
			});
	};

	joinGame = () => {
		this.checkCode();
	};

	setJoinCode = length => {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		this.setState({
			joinCode: result.toUpperCase()
		});
	};

	checkCode = () => {
		axios
			.get(`http://localhost:4001/api/game/code/${this.state.insertCode}`)
			.then(res => {
				if (res.data.length > 0) {
					console.log(res);
					this.setState({ joinedGame: res.data }, this.checkGame);
				}
			})
			.catch(error => {
				Swal.fire("Erreur", "code erronée", "error");
			});
	};

	checkGame = () => {
		console.log(this.state.joinedGame);
		if (this.state.joinedGame[0].game_status > 1) {
			Swal.fire("Erreur", "Game already started", "error");
		} else {
			axios
				.get(`http://localhost:4001/api/usergame/game/${this.state.joinedGame[0].id_game}`)
				.then(res => {
					console.log(res.data);
					if (res.data.length === 0) {
						Swal.fire("Erreur", "Game created but not validated by creator", "error");
					}
					if (res.data.length > 0) {
						axios
							.post(
								"http://localhost:4001/api/usergame",
								{
									id_game_fk: this.state.joinedGame[0].id_game,
									id_user: this.state.userId
								},
								{
									headers: {
										Accept: "application/json"
									}
								}
							)
							.then(response => {
								this.props.history.push(
									`/game/lobby/${this.state.joinedGame[0].id_game}`
								);
							})
							.catch(error => {
								Swal.fire("Erreur", "Fail join game", "error");
							});
					}
				})
				.catch(error => {
					console.error();
				});
		}

	};

	render() {
		//console.log(this.state.userId);
		//console.log(this.state.joinCode);
		return (
			<div className="container fontCyan">
				<div className="d-flex justify-content-center align-items-center mindBox">
					<div style={{ width: "165px", height: "165px" }}>
						<SvgFactory iconname="mind" />
					</div>
				</div>
				<form className="inputBox">
					{this.state.displayNameField ? (
						<>
							<input
								type="text"
								name="username"
								placeholder="name"
								className="cyanAndTransparent nameInput my-2"
								value={this.state.username}
								onChange={this.handleInputChange}
							/>
							<div
								className="nameInput inputBox imperialButton my-2"
								onClick={this.setUser}
							>
								CREATE USER
							</div>
						</>
					) : (
							<>
								<input
									type="text"
									name="insertCode"
									placeholder="code"
									className="cyanAndTransparent nameInput my-2"
									value={this.state.insertCode}
									onChange={this.handleInputChange}
								/>

								<div
									className="nameInput inputBox salsaButton my-2"
									onClick={this.joinGame}
								>
									JOIN GAME
							</div>
								<div
									className="nameInput inputBox imperialButton my-2"
									onClick={this.createGame}
								>
									CREATE GAME
							</div>
								{/* {this.state.joinCode && this.state.joinCode.length > 0 && (
								<div className="my-4 codeFont">{this.state.joinCode}</div>
							)} */}
								<Link
									to={`/games/user/${this.state.userId}`}
									className="link-unstyled"
									style={{ width: "100%" }}
								>
									<div className="nameInput inputBox imperialButton my-2">
										CURRENT GAMES
								</div>
								</Link>
							</>
						)}
				</form>
			</div>
		);
	}
}
