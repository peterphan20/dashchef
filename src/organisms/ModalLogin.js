import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/usersAPI";
import { USER_LOGIN, HIDE_LOGIN_MODAL } from "../constants";
import { loginChef } from "../api/chefsAPI";
import LoginInsert from "../molecules/LoginInsert";

const ModalLogin = () => {
	const [authResponse, setAuthResponse] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isChef, setIsChef] = useState("");
	const dispatch = useDispatch();

	const handleUserLogin = async (userObject) => {
		const apiResponse = await loginUser(userObject);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			localStorage.setItem("authToken", apiResponse.token);
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
			dispatch({ type: HIDE_LOGIN_MODAL });
		}
	};

	const handleChefLogin = async (chefObject) => {
		const apiResponse = await loginChef(chefObject);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
			console.log("api failed");
		} else {
			localStorage.setItem("authToken", apiResponse.token);
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
			dispatch({ type: HIDE_LOGIN_MODAL });
		}
	};

	const handleLogin = () => {
		const userObject = {
			email,
			password,
		};
		if (isChef === "yes") {
			handleChefLogin(userObject);
		} else if (isChef === "no") {
			handleUserLogin(userObject);
		}
	};

	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
			onClick={() => dispatch({ type: HIDE_LOGIN_MODAL })}
		>
			<LoginInsert
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				setIsChef={setIsChef}
				authResponse={authResponse}
				handleLogin={handleLogin}
			/>
		</div>
	);
};

export default ModalLogin;
