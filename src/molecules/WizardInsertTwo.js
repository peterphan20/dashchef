import React from "react";
import { useDispatch } from "react-redux";
import { toggleHideSignUpModal } from "../actions/modalAction";
import Dropdown from "../atoms/Dropdown";
import InputFieldSignup from "../atoms/InputFieldSignup";

const WizardInsertTwo = ({ firstname, setFirstname, lastname, setLastname, chef, setChef }) => {
	const dispatch = useDispatch();

	return (
		<div
			className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
			onClick={() => dispatch(toggleHideSignUpModal())}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow px-8 pt-8 pb-2 mb-20 z-20"
			>
				<button
					className="flex self-end text-sm text-gray-400"
					onClick={() => dispatch(toggleHideSignUpModal())}
				>
					<i className="fas fa-times"></i>
				</button>
				<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 pt-5 pb-8">
					Sign up for Dashchef
				</h1>
				<div className="rounded-md shadow-sm -space-y-px mb-5">
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
						className=""
						value={lastname}
						changeHandler={(e) => setLastname(e.target.value)}
					/>
					<Dropdown selected={chef} options onSelectedChange label />
				</div>
			</div>
		</div>
	);
};

export default WizardInsertTwo;
