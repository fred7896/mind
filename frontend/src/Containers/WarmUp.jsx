import React from "react";
import axios from "axios";
import "../Components/Home/Home.scss";
import "../global.scss";

export default class WarmUp extends React.Component {

	state = {
		players: []
	}

	componentDidMount() {
		this.getPlayers();
	}

	getPlayers = () => {
		axios.get(`http://localhost:4001/api/usergame/game/${this.props.match.params.gameId}`).then(res => {
			this.setState({
				players: res.data
			})
		})
	}
	updateGameStatus = () => {
		axios
			.get(`http://localhost:4001/api/game/all/${this.props.match.params.gameId}`)
			.then(res => {
				if (res.data.length > 0) {
					if (res.data[0].game_status == 0) {
						let data = {
							game_status: 1
						};
						axios
							.put(`http://localhost:4001/api/game/${this.props.match.params.gameId}`, data)
							.then(res => {
								console.log(res);
								this.props.history.push(`/game/main/${this.props.match.params.gameId}`);
							});

					}
					if (res.data[0].game_status > 0) {
						this.props.history.push(`/game/main/${this.props.match.params.gameId}`);
					}
				}
			})
			.catch(error => {
				console.log(error);
			});


	};

	render() {
		const idGame = this.props.match.params.gameId;
		console.log(this.state.players);
		return (
			<React.Fragment>
				<div className="container fontCyan">
					<div className="codeFont my-3">GAME {idGame ? idGame : "0"}</div>
					{this.state.players.map(player => {
						return (
							<div key={player.id_user} className="cyanAndTransparent nameInput codeFont mb-2 d-flex justify-content-center align-items-center">{player.user_name}</div>
						)
					})}
					<div className="imperialButton nameInput d-flex justify-content-center align-items-center" onClick={this.updateGameStatus}>
						GO !
					</div>
				</div>
			</React.Fragment>
		);
	}
}
