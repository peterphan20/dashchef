import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Headers from "./organisms/Header";
import Footer from "./organisms/Footer";
import ModalLogin from "./organisms/ModalLogin";
import ModalSignUp from "./organisms/ModalSignUp";
import { getUser, validateToken } from "./api/usersAPI";
import { getChef } from "./api/chefsAPI";
import { USER_LOGIN } from "./constants";
import ModalCart from "./organisms/ModalCart";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Kitchen from "./pages/Kitchen";
import CreateKitchen from "./pages/CreateKitchen";
import Driver from "./pages/Driver";
import Cart from "./pages/Cart";
import EditKitchen from "./pages/EditKitchen";
import CreateMenuItem from "./pages/CreateMenuItem";
import ImageUploadUser from "./pages/ImageUploadUser";
import ImageUploadKitchen from "./pages/ImageUploadKitchen";
import KitchensList from "./pages/KitchensList";
import OrderConfirmation from "./pages/OrderConfirmation";
import EditMenuItem from "./pages/EditMenuItem";

const App = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);
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
		return isSignupOpen ? (
			<div
				className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
				onMouseDown={() => setIsSignupOpen(false)}
			>
				<ModalSignUp setIsSignupOpen={setIsSignupOpen} />
			</div>
		) : null;
	};

	return (
		<Router>
			<Headers
				setIsLoginOpen={setIsLoginOpen}
				setIsSignupOpen={setIsSignupOpen}
				setIsCartOpen={setIsCartOpen}
			/>
			{isLoginOpen ? (
				<ModalLogin setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} />
			) : null}
			{renderSignUp()}
			{isCartOpen ? <ModalCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> : null}
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/profile/:userID" element={<Profile />}></Route>
				<Route path="/kitchens/all" element={<KitchensList />}></Route>
				<Route path="/kitchen/id/:kitchenID" element={<Kitchen />}></Route>
				<Route path="/create/kitchen" element={<CreateKitchen />}></Route>
				<Route path="/create/menu-item" element={<CreateMenuItem />}></Route>
				<Route path="/edit/kitchen/:kitchenID" element={<EditKitchen />}></Route>
				<Route path="/edit/menu-item/:menuItemID" element={<EditMenuItem />}></Route>
				<Route path="/image-upload/user/:userID" element={<ImageUploadUser />}></Route>
				<Route path="/image-upload/kitchen/:kitchenID" element={<ImageUploadKitchen />}></Route>
				<Route path="/driver" element={<Driver />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
				<Route path="/order-confirmation" element={<OrderConfirmation />}></Route>
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
