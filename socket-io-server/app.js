const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const { db } = require("./conf");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

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

server.listen(port, () => console.log(`Listening on port ${port}`));
