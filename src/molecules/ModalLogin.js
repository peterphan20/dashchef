import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../api/usersAPI";
import { toggleHideLoginModal } from "../actions/modalAction";
import { LOGIN_USER } from "../constants/userActionTypes";

const ModalLogin = () => {
	const [authResponse, setAuthResponse] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleUserLogin = async () => {
		const userObj = {
			email,
			password,
		};
		const res = await loginUser(userObj);

		if (res.code === 200) {
			const payload = {
				userID: res.id,
				firstName: res.firstname,
				lastName: res.lastname,
				signedIn: true,
			};
			dispatch({ type: LOGIN_USER, payload });
			setAuthResponse(true);
		} else {
			const payload = {
				userID: null,
				firstName: null,
				lastName: null,
				signedIn: false,
			};
			dispatch({ type: LOGIN_USER, payload });
			setAuthResponse(false);
		}
	};

	const response = <div>{authResponse ? null : <p>Invalid user credentials</p>}</div>;

	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
			onClick={() => dispatch(toggleHideLoginModal())}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow p-8 mb-40 z-20"
			>
				<button
					className="flex self-end text-sm text-gray-400"
					onClick={() => dispatch(toggleHideLoginModal())}
				>
					<i className="fas fa-times"></i>
				</button>
				<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 py-5">
					Sign in to get home cooked meals!
				</h1>
				<div className="rounded-md shadow-sm -space-y-px mb-5">
					<div>
						<label htmlFor="email-address" className="sr-only">
							Email address
						</label>
						<input
							id="email-address"
							name="email"
							type="text"
							autoComplete="email"
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="text"
							autoComplete="current-password"
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<button
					className="bg-red-600 text-gray-100 text-base rounded-lg py-1 px-3 mb-5 w-full h-full"
					onClick={() => dispatch(handleUserLogin)}
				>
					Sign in
				</button>
				<h1 className="text-sm font-medium">
					Don't have an account?{" "}
					<Link to="/sign-up" className="text-blue-700">
						Sign up
					</Link>
				</h1>
			</div>
			{response}
		</div>
	);
};

export default ModalLogin;
