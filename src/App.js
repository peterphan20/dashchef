import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { routes } from "./routes";
import Headers from "./organisms/Header";
import Footer from "./organisms/Footer";

const App = () => {
	return (
		<Router>
			<Headers />
			<Switch>
				{routes.map((route, idx) => {
					return <Route {...route} key={idx} />;
				})}
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
