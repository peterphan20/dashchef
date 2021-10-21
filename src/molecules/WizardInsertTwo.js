import React from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../atoms/FormInputField";
import { HIDE_SIGN_UP_MODAL } from "../constants";

const WizardInsertTwo = ({ firstname, setFirstname, lastname, setLastname, isChef, setIsChef }) => {
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
					htmlFor="firstname"
					text="firstname"
					type="text"
					placeholder="First Name"
					className="mb-3"
					value={firstname}
					changeHandler={(e) => setFirstname(e.target.value)}
				/>
				<FormInputField
					htmlFor="lastname"
					text="lastname"
					type="text"
					placeholder="Last Name"
					className="mb-3"
					value={lastname}
					changeHandler={(e) => setLastname(e.target.value)}
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
		</>
	);
};

export default WizardInsertTwo;
