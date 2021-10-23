import React from "react";
import { useDispatch } from "react-redux";
import InputFieldLogin from "../atoms/InputFieldLogin";
import { DISPLAY_SIGN_UP_MODAL, HIDE_LOGIN_MODAL } from "../constants";

const LoginInsert = ({
	email,
	setEmail,
	password,
	setPassword,
	setIsChef,
	authResponse,
	handleLogin,
}) => {
	const dispatch = useDispatch();

	const handleShowSignUpModal = () => {
		dispatch({ type: HIDE_LOGIN_MODAL });
		dispatch({ type: DISPLAY_SIGN_UP_MODAL });
	};

	return (
		<>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow p-8 mb-40 z-20"
			>
				<button
					className="flex self-end text-sm text-gray-400"
					onClick={() => dispatch({ type: HIDE_LOGIN_MODAL })}
				>
					<i className="fas fa-times"></i>
				</button>
				<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 py-5">
					Sign in to get home cooked meals!
				</h1>
				<div className="rounded-md -space-y-px mb-5">
					<InputFieldLogin
						htmlFor="login-email-address"
						text="email"
						className=""
						placeholder="Email Address"
						autoComplete="email"
						value={email}
						changeHandler={(e) => setEmail(e.target.value)}
					/>
					<InputFieldLogin
						htmlFor="login-password"
						text="password"
						className=""
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						changeHandler={(e) => setPassword(e.target.value)}
					/>
					<select
						className="rounded-none relative block w-full pl-2 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						name="isChef"
						defaultValue=""
						onChange={(e) => setIsChef(e.target.value)}
					>
						<option value="">Are you a chef?</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<button
					className="bg-red-600 text-gray-100 text-base rounded-lg py-1 px-3 mb-5 w-full h-full"
					onClick={() => dispatch(handleLogin)}
				>
					Sign in
				</button>
				{authResponse ? null : <p>Invalid user credentials</p>}
				<h1 className="text-sm font-medium">
					Don't have an account?{" "}
					<button className="text-blue-700" onClick={handleShowSignUpModal}>
						Sign up
					</button>
				</h1>
			</div>
		</>
	);
};

export default LoginInsert;
// TODO: FIX 76