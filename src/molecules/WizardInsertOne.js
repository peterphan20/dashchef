import React from "react";
import { useDispatch } from "react-redux";
import { toggleHideSignUpModal } from "../actions/modalAction";
import InputFieldSignup from "../atoms/InputFieldSignup";

const WizardInsertOne = ({ email, setEmail, password, setPassword }) => {
	const dispatch = useDispatch();

	return (
		<>
			<button
				className="flex self-end text-sm text-gray-400"
				onClick={() => dispatch(toggleHideSignUpModal())}
			>
				<i className="fas fa-times"></i>
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 pt-5 pb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px mb-5">
				<InputFieldSignup
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					className="mb-3"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<InputFieldSignup
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
