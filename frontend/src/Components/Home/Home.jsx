import React from "react";
import "./Home.scss";
import SvgFactory from "../SvgFactory/SvgFactory";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "" };
	}

	handleChange = event => {
		this.setState({ username: event.target.value });
	};

	setUser = () => {
		axios
      .post(
        "http://localhost:4001/api/user",
        {
          name: this.state.username,
        },
        {
          headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${token}`
          }
        }
      ).then(() => {
        swal(
          "Utilisateur créé",
          `Nom : ${this.state.username}`,
          "success"
        );
      })
      .catch(error => {
        swal("Erreur", "la création du user a échoué", "error");
      });
		
	}

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
						value={this.state.username}
						onChange={this.handleChange}
					/>

					<div className="nameInput inputBox imperialButton my-2" onClick={this.setUser}>CREATE</div>
					<div className="nameInput inputBox salsaButton my-2">JOIN</div>
				</form>
			</div>
		);
	}
}
