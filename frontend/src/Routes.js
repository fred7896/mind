import Home from "./Components/Home/Home";
import WarmUp from "./Containers/WarmUp";
import Game from "./Containers/Game";
import GamesCreated from "./Containers/GamesCreated";

const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/game/lobby/:gameId",
		component: WarmUp
	},
	{
		path: "/game/main/:gameId",
		component: Game
	},
	{
		path: "/games/user/:id",
		component: GamesCreated
	}
];

export default routes;
