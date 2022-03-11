import React from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../atoms/FormInputField";
import { HIDE_SIGN_UP_MODAL } from "../constants";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

const WizardInsertOne = ({ email, setEmail, password, setPassword }) => {
	const dispatch = useDispatch();

	return (
		<>
			<button
				className="flex self-end text-gray-400"
				onMouseDown={() => dispatch({ type: HIDE_SIGN_UP_MODAL })}
			>
				{/* <FontAwesomeIcon icon={faTimes} />  */}
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 mt-5 mb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px">
				<FormInputField
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
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
