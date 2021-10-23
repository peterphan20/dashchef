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
		console.log("api response", apiResponse);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			localStorage.setItem("authToken", apiResponse.token);
			const payload = {
				isChef: false,
				userID: apiResponse.id,
				firstName: apiResponse.firstName,
				lastName: apiResponse.lastName,
				email: apiResponse.email,
				address: apiResponse.address,
				phone: apiResponse.phone,
				avatarURL: apiResponse.avatarURL,
				loggedIn: true,
			};
			console.log("users's payload", payload);
			dispatch({ type: USER_LOGIN, payload });
			dispatch({ type: HIDE_LOGIN_MODAL });
		}
	};

	const handleChefLogin = async (chefObject) => {
		const apiResponse = await loginChef(chefObject);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			localStorage.setItem("authToken", apiResponse.token);
			const payload = {
				isChef: true,
				chefID: apiResponse.data.id,
				firstName: apiResponse.data.firstName,
				lastName: apiResponse.data.lastName,
				email: apiResponse.data.email,
				address: apiResponse.data.address,
				phone: apiResponse.data.phone,
				avatarURL: apiResponse.data.avatarURL,
				loggedIn: true,
			};
			console.log("chef's payload", payload);
			dispatch({ type: USER_LOGIN, payload });
		}
	};

	const handleLogin = () => {
		const userObject = {
			email,
			password,
		};
		console.log("login credentials", userObject);
		if (isChef === "yes") {
			console.log("chef login");
			handleChefLogin(userObject);
		} else if (isChef === "no") {
			console.log("user login");
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
