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

// CREATE USER

app.post("/api/user", (req, res) => {
	const user = { user_name: req.body.name };

	db.query("INSERT INTO user SET ?", user, (err, results) => {
		if (err) {
			console.error("Failure! " + err);
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

server.listen(port, () => console.log(`Listening on port ${port}`));
