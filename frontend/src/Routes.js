import Home from "./Components/Home/Home";
import WarmUp from "./Containers/WarmUp";
import GamesCreated from "./Containers/GamesCreated";

const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/game/step1/:gameId",
		component: WarmUp
	},
	{
		path: "/games/user/:id",
		component: GamesCreated
	}
];

export default routes;
