import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./Routes";
import "./global.scss";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";

const opts = {
	enableMouseEvents: true
};

function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={props => (
				// pass the sub-routes down to keep nesting
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
}

function App() {
	return (
		<div className="App">
			<DndProvider backend={TouchBackend} options={opts}>
				<Router>
					<Switch>
						{routes.map((route, i) => (
							<RouteWithSubRoutes key={i} {...route} />
						))}
					</Switch>
				</Router>
			</DndProvider>
		</div>
	);
}

export default App;
