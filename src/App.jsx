import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./organisms/Header";
import Footer from "./organisms/Footer";
import ModalLogin from "./organisms/ModalLogin";
import ModalSignUp from "./organisms/ModalSignUp";
import { getUser, validateToken } from "./api/usersAPI";
import { getChef } from "./api/chefsAPI";
import { USER_LOGIN, HIDE_SIGN_UP_MODAL } from "./constants";
import ModalCart from "./organisms/ModalCart";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Kitchen from "./pages/Kitchen";
import CreateKitchen from "./organisms/CreateKitchen";
import Driver from "./pages/Driver";
import Cart from "./pages/Cart";
import EditKitchen from "./pages/EditKitchen";
import CreateMenuItem from "./organisms/CreateMenuItem";
import ImageUpload from "./pages/ImageUpload";
import KitchensList from "./pages/KitchensList";

const App = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const modal = useSelector((state) => state.modalReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		async function validateUser() {
			const token = localStorage.getItem("authToken");
			const isChef = localStorage.getItem("isChef");
			if (!token) return;
			const apiResponse = await validateToken(token);
			if (!apiResponse.id) return;
			if (isChef === "0") {
				const userApiResponse = await getUser(apiResponse.id);
				const userData = userApiResponse.rows[0];
				const payload = {
					isChef: false,
					id: userData.id,
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					address: userData.address,
					phone: userData.phone,
					avatarURL: userData.avatarURL,
					loggedIn: true,
				};
				dispatch({ type: USER_LOGIN, payload });
			} else {
				const chefApiResponse = await getChef(apiResponse.id);
				const chefData = chefApiResponse.rows[0];
				const payload = {
					isChef: true,
					id: chefData.id,
					kitchenID: chefData.kitchenID,
					firstName: chefData.firstName,
					lastName: chefData.lastName,
					email: chefData.email,
					address: chefData.address,
					phone: chefData.phone,
					avatarURL: chefData.avatarURL,
					loggedIn: true,
				};
				dispatch({ type: USER_LOGIN, payload });
			}
		}
		validateUser();
	}, [dispatch]);

	const renderSignUp = () => {
		return modal.showSignUpModal ? (
			<div
				className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
				onMouseDown={() => dispatch({ type: HIDE_SIGN_UP_MODAL })}
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
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/profile/:userID" element={<Profile />}></Route>
				<Route path="/kitchens/all" element={<KitchensList />}></Route>
				<Route path="/kitchen/id/:kitchenID" element={<Kitchen />}></Route>
				<Route path="/create/kitchen" element={<CreateKitchen />}></Route>
				<Route path="/edit/kitchen/:kitchenID" element={<EditKitchen />}></Route>
				<Route path="/create/menu-item" element={<CreateMenuItem />}></Route>
				<Route path="/image-upload/:userID" element={<ImageUpload />}></Route>
				<Route path="/driver" element={<Driver />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;

// {routes.map((route, idx) => {
// 	return <Route {...route} key={idx} />;
// })}
