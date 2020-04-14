import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Components/Home/Home.scss";
import "../global.scss";
import { Link } from "react-router-dom";

export default class GamesCreated extends React.Component {
	state = {
		games: []
	};

	componentDidMount() {
		this.displayGamesCreatedByUser();
	}

	renderButton = (status, id) => {
		switch (status) {
			case 0:
				return (
					<Link
						to={`/game/lobby/${id}`}
						className="link-unstyled"
						style={{ width: "50%" }}
						onClick={this.joinGame.bind(this, id)}
					>
						<div
							className="imperialButton d-flex align-items-center"
							style={{ height: "100%" }}
						>
							Start Game
						</div>
					</Link>
				);
			case 1:
				return (
					<Link
						to={`/game/lobby/${id}`}
						className="link-unstyled"
						style={{ width: "50%" }}
						onClick={this.joinGame.bind(this, id)}
					>
						<div
							className="imperialButton d-flex align-items-center"
							style={{ height: "100%" }}
						>
							Continue Game
						</div>
					</Link>
				);
			case 2:
				return (
					<div
						className="imperialButton d-flex align-items-center"
						style={{ width: "50%" }}
					>
						Game details
					</div>
				);
			default:
				console.log("Sorry, we are out of " + status + ".");
		}
	};

	displayGamesCreatedByUser = () => {
		axios
			.get(`http://localhost:4001/api/game/creator/${this.props.match.params.id}`)
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
						games: res.data
					});
				}
			})
			.catch(error => {
				console.log(error);
				Swal.fire("Erreur", "la recupération des games du user a échoué", "error");
			});
	};

	joinGame = (gameId) => {
		axios.post(
			"http://localhost:4001/api/usergame",
			{
				id_game_fk: gameId,
				id_user: this.props.match.params.id
			},
			{
				headers: {
					Accept: "application/json"
				}
			}
		);
	};
	render() {
		return (
			<div className="container fontCyan">
				<div className="salsaButton my-5">Games</div>
				{this.state.games.map(e => {
					return (
						<div
							key={e.id_game}
							className="d-flex my-1"
							style={{ width: "100%", height: "53px" }}
						>
							<div
								className="imperialButton d-flex justify-content-center align-items-center"
								style={{ width: "10%" }}
							>
								{e.id_game}
							</div>
							<div
								className="imperialButton d-flex justify-content-center align-items-center"
								style={{ width: "40%" }}
							>
								{e.shared_code}
							</div>
							{this.renderButton(e.game_status, e.id_game)}
						</div>
					);
				})}
			</div>
		);
	}
}
