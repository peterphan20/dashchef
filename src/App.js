import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "./routes";
import Headers from "./organisms/Header";
import Footer from "./organisms/Footer";
import ModalLogin from "./organisms/ModalLogin.js";
import ModalSignUp from "./organisms/ModalSignUp";
import { loginUser } from "./api/usersAPI";
import { loginChef } from "./api/chefsAPI";
import { USER_LOGIN, HIDE_SIGN_UP_MODAL } from "./constants";
import ModalCart from "./organisms/ModalCart";

const App = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const modal = useSelector((state) => state.modalReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const isChef = localStorage.getItem("isChef");
		if (!token) return;
		if (isChef === "0") {
			async function getUserData() {
				const apiResponse = await loginUser(token);
				const payload = {
					isChef: false,
					id: apiResponse.id,
					firstName: apiResponse.firstName,
					lastName: apiResponse.lastName,
					email: apiResponse.email,
					address: apiResponse.address,
					phone: apiResponse.phone,
					avatarURL: apiResponse.avatarURL,
					loggedIn: true,
				};
				dispatch({ type: USER_LOGIN, payload });
			}
			getUserData();
		} else {
			async function getChefData() {
				console.log(token);
				const apiResponse = await loginChef(token);
				console.log("chef data", apiResponse);
				const payload = {
					isChef: true,
					id: apiResponse.id,
					kitchenID: apiResponse.kitchenID,
					firstName: apiResponse.firstName,
					lastName: apiResponse.lastName,
					email: apiResponse.email,
					address: apiResponse.address,
					phone: apiResponse.phone,
					avatarURL: apiResponse.avatarURL,
					loggedIn: true,
				};
				dispatch({ type: USER_LOGIN, payload });
			}
			getChefData();
		}
	}, [history, dispatch]);

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
			<Headers setIsCartOpen={setIsCartOpen} />
			{modal.showLoginModal ? <ModalLogin /> : null}
			{renderSignUp()}
			<ModalCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
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
