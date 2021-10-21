import React from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../atoms/FormInputField";
import { HIDE_SIGN_UP_MODAL } from "../constants";

const WizardInsertOne = ({ email, setEmail, password, setPassword }) => {
	const dispatch = useDispatch();

	return (
		<>
			<button
				className="flex self-end text-sm text-gray-400"
				onClick={() => dispatch({ type: HIDE_SIGN_UP_MODAL })}
			>
				<i className="fas fa-times"></i>
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 pt-5 pb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px mb-5">
				<FormInputField
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					className="mb-3"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<FormInputField
					htmlFor="password"
					text="password"
					type="password"
					placeholder="Password"
					value={password}
					changeHandler={(e) => setPassword(e.target.value)}
				/>
			</div>
		</>
	);
};

export default WizardInsertOne;
