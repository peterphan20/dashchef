import React from "react";
import { useDispatch } from "react-redux";
import { toggleHideSignUpModal } from "../actions/modalAction";
import Dropdown from "../atoms/Dropdown";
import InputFieldSignup from "../atoms/InputFieldSignup";
import { isChef } from "../helpers/isChef";

const WizardInsertTwo = ({ firstname, setFirstname, lastname, setLastname, chef, setChef }) => {
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
					htmlFor="sign-up-email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					className="mb-3"
					value={firstname}
					changeHandler={(e) => setFirstname(e.target.value)}
				/>
				<InputFieldSignup
					htmlFor="sign-up-password"
					text="password"
					type="password"
					placeholder="Password"
					className="mb-3"
					value={lastname}
					changeHandler={(e) => setLastname(e.target.value)}
				/>
				<Dropdown
					selected={chef}
					options={isChef}
					onSelectedChange={(e) => setChef(e.target.value)}
					label="Are you a chef?"
				/>
			</div>
		</>
	);
};

export default WizardInsertTwo;
