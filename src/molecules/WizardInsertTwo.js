import React from "react";
import { useDispatch } from "react-redux";
import { toggleHideSignUpModal } from "../actions/modalAction";
import InputFieldSignup from "../atoms/InputFieldSignup";

const WizardInsertTwo = ({ firstname, setFirstname, lastname, setLastname, isChef, setIsChef }) => {
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
					htmlFor="firstname"
					text="firstname"
					type="text"
					placeholder="First Name"
					className="mb-3"
					value={firstname}
					changeHandler={(e) => setFirstname(e.target.value)}
				/>
				<InputFieldSignup
					htmlFor="lastname"
					text="lastname"
					type="text"
					placeholder="Last Name"
					className="mb-3"
					value={lastname}
					changeHandler={(e) => setLastname(e.target.value)}
				/>
			</div>
		</>
	);
};

export default WizardInsertTwo;
