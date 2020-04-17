const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const { db } = require("./conf");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4001;
//const index = require("./routes/index");

const app = express();
//app.use(index);

// MIDDLEWARE
app.use(cors());

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const getApiAndEmit = "TODO";

let interval;

io.on("connection", socket => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 10000);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

// TEST
app.get("/", (req, res) => {
	const msg = "Mind Game backend";
	console.log(msg);
	res.status(200).send(msg);
});

// GET USER

app.get("/api/user", (req, res) => {
	let user = req.query.name;
	db.query(`SELECT id_user FROM user WHERE user_name = ?`, [user], (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la récupération du user");
		} else {
			res.json(results);
		}
	});
});

// CREATE USER

app.post("/api/user", (req, res) => {
	const user = { user_name: req.body.name };

	db.query("INSERT INTO user SET ?", user, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
			console.log(err.code);
			let errorCode = err.code;
			if (errorCode.includes("ER_DUP_ENTRY")) {
				return res.status(409).send("nom d'utilisateur déjà utilisé");
			}
			return res.status(500).send("requete de création invalide");
		} else {
			console.log("The solution is: ", results);
			res.send({
				code: 201,
				success: "Succès - création user"
			});
		}
	});
});

// CREATE GAME
app.post("/api/game", (req, res) => {
	const game = {
		shared_code: req.body.shared_code,
		created_by: req.body.created_by,
		game_status: req.body.game_status
	};
	db.query("INSERT INTO game SET ?", game, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
			return res.status(500).send("requete de création invalide");
		} else {
			console.log("The solution is: ", results);
			res.send({
				code: 201,
				success: "Succès - création game"
			});
		}
	});
});

//GET GAME BY JOIN CODE
app.get("/api/game/code/:code", (req, res) => {
	const code = req.params.code;
	console.log(code);
	db.query("SELECT * FROM game WHERE shared_code = ?", [code], (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la récupération de la partie");
		} else {
			res.json(results);
		}
	});
});

// GET USERS FROM GAME
app.get("/api/usergame/game/:gameid", (req, res) => {
	const gameId = req.params.gameid;
	db.query(
		"SELECT ug.*, u.* FROM user_game AS ug JOIN user AS u ON u.id_user = ug.id_user WHERE ug.id_game_fk = ?",
		[gameId],
		(err, results) => {
			if (err) {
				res.status(500).send("Erreur lors de la récupération des joueurs");
			} else {
				res.json(results);
			}
		}
	);
});

// USER JOIN GAME
app.post("/api/usergame", (req, res) => {
	const game = {
		id_game_fk: req.body.id_game_fk,
		id_user: req.body.id_user
	};
	db.query("INSERT INTO user_game SET ?", game, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
			let errorCode = err.code;
			if (errorCode.includes("ER_DUP_ENTRY")) {
				return res.status(409).send("user already joined game");
			}
			return res.status(500).send("requete de création invalide");
		} else {
			console.log("The solution is: ", results);
			res.send({
				code: 201,
				success: "Succès - player joins game"
			});
		}
	});
});

//GET GAMES BY USER ID
app.get("/api/game/creator/:id", (req, res) => {
	const created_by = req.params.id;
	console.log(req.params.id);
	db.query("SELECT * FROM game WHERE created_by = ?", [created_by], (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la récupération des games");
		} else {
			res.json(results);
		}
	});
});

// UPDATE STATUS GAME
app.put("/api/game/:id", (req, res) => {
	const gameId = req.params.id;
	const formData = req.body;

	db.query("UPDATE game SET ? WHERE id_game = ?", [formData, gameId], err => {
		if (err) {
			console.log(err);
			res.status(500).send("Erreur lors de la modification d'une game");
		} else {
			res.sendStatus(200);
		}
	});
});

// GET GAME INFOS BY GAME ID
app.get("/api/game/all/:id", (req, res) => {
	const gameId = req.params.id;
	db.query("SELECT * FROM game WHERE id_game = ?", [gameId], (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la récupération de la partie");
		} else {
			res.json(results);
		}
	});
});

// GET CARDS ALL
app.get("/api/card/all", (req, res) => {
	db.query("SELECT * FROM card ", (err, results) => {
		if (err) {
			res.status(500).send("Erreur lors de la récupération de la partie");
		} else {
			res.json(results);
		}
	});
});

// SET CARDGAME
app.post("/api/cardgame", (req, res) => {
	const cardgame = {
		id_card: req.body.id_card,
		id_game: req.body.id_game
	};
	db.query("INSERT INTO card_game SET ?", cardgame, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
			return res.status(500).send("requete de création invalide");
		} else {
			console.log("The solution is: ", results);
			res.send({
				code: 201,
				success: "Succès - création library"
			});
		}
	});
});

// GET CARDGAME BY GAME
app.get("/api/cardgame/game/:id", (req, res) => {
	const gameId = req.params.id;
	db.query("SELECT * FROM card_game WHERE id_game = ?", [gameId], (err, results) => {
		if (err) {
			res.status(500).send("get cardgame error");
		} else {
			res.json(results);
		}
	});
});

// GETCARDSTATE BY GAME
app.get("/api/cardstate/game/:id", (req, res) => {
	const gameId = req.params.id;
	db.query(
		"SELECT * FROM card_state AS cs JOIN card_game AS cg ON cg.id_card_game = cs.id_card_game WHERE cg.id_game = ?",
		[gameId],
		(err, results) => {
			if (err) {
				res.status(500).send("get cardstate error");
			} else {
				res.json(results);
			}
		}
	);
});

// SET CARDSTATE
app.post("/api/cardstate", (req, res) => {
	const cardstate = {
		id_card_game: req.body.id_card_game,
		id_slot: req.body.id_slot,
		move: req.body.move
	};
	db.query("INSERT INTO card_state SET ?", cardstate, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
			return res.status(500).send("requete de création invalide");
		} else {
			console.log("The solution is: ", results);
			res.send({
				code: 201,
				success: "Succès - création library"
			});
		}
	});
});

//UPDATE CARDSTATE
app.put("/api/cardstate/:id", (req, res) => {
	const cardstateId = req.params.id;
	const formData = req.body;

	db.query("UPDATE card_state SET ? WHERE id_card_state = ?", [formData, cardstateId], err => {
		if (err) {
			console.log(err);
			res.status(500).send("Erreur lors de la modification d'une game");
		} else {
			res.sendStatus(200);
		}
	});
});

//GET CARD VALUE
app.get("/api/cardgame/value/:id", (req, res) => {
	const id_card_game = req.params.id;
	db.query(
		"SELECT id_card FROM card_game WHERE id_card_game = ?",
		[id_card_game],
		(err, results) => {
			if (err) {
				res.status(500).send("get card value error");
			} else {
				res.json(results);
			}
		}
	);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
