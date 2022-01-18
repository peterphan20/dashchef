import React from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../atoms/FormInputField";
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

	const handleTestUser = () => {
		setEmail("kitchen@test.com");
		setPassword("test");
		setIsChef("yes");
	};

	return (
		<>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow p-8 z-20 lg:w-96 lg:max-w-l"
			>
				<button
					className="flex self-end text-sm text-gray-400"
					onClick={() => dispatch({ type: HIDE_LOGIN_MODAL })}
				>
					<i className="fas fa-times"></i>
				</button>
				<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 py-5 lg:break-words">
					Sign in to get home cooked meals!
				</h1>
				<button
					className="bg-green-400 text-gray-100 text-sm rounded-md py-1 px-2 mb-5 w-32 h-full"
					onClick={handleTestUser}
				>
					Test Chef
				</button>
				{authResponse ? null : (
					<p className="text-center text-lg text-red-600 font-body pb-5">
						Incorrect username or password
					</p>
				)}
				<div className="rounded-md -space-y-px mb-5">
					<FormInputField
						htmlFor="login-email-address"
						type="text"
						text="email"
						placeholder="Email Address"
						autoComplete="email"
						value={email}
						changeHandler={(e) => setEmail(e.target.value)}
					/>
					<FormInputField
						htmlFor="login-password"
						type="password"
						text="password"
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						changeHandler={(e) => setPassword(e.target.value)}
					/>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Are you a chef?</label>
						<select
							className="relative block rounded-none w-full pl-2 py-2 mb-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
							name="isChef"
							defaultValue=""
							onChange={(e) => setIsChef(e.target.value)}
						>
							<option value="">Are you a chef?</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
				<button
					className="bg-red-600 text-gray-100 text-base rounded-md py-2 px-3 mb-5 w-full h-full"
					onClick={handleLogin}
				>
					Sign in
				</button>
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
