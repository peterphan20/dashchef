import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "./routes";
import Headers from "./organisms/Header";
import Footer from "./organisms/Footer";
import ModalLogin from "./organisms/ModalLogin.js";
import ModalSignUp from "./organisms/ModalSignUp";
import { HIDE_SIGN_UP_MODAL } from "./constants";

const App = () => {
	// TODO: Set up a box that shows demo user information
	const modal = useSelector((state) => state.modalReducer);
	const dispatch = useDispatch();

	const renderSignUp = () => {
		return modal.showSignUpModal ? (
			<div
				className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
				onClick={() => dispatch({ type: HIDE_SIGN_UP_MODAL })}
			>
				<ModalSignUp />
			</div>
		) : null;
	};

	return (
		<Router>
			<Headers />
			{modal.showLoginModal ? <ModalLogin /> : null}
			{renderSignUp()}
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
