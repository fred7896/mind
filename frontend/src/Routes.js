import Home from "./Components/Home/Home";
import Game from "./Components/Game";

const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/game",
		component: Game
	},
	{
		path: "/game/:id",
		component: Game
	}
];

export default routes;
