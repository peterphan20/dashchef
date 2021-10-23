import React from "react";
import FormInputField from "../atoms/FormInputField";

const UpdateUserForm = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phone,
	setPhone,
	email,
	setEmail,
	handleUpdateUser,
	setOpenEditForm,
}) => {
	return (
		<div className="-space-y-px px-5 pt-5 pb-5 my-8 border-t border-b border-gray-300 w-full h-full">
			<h1 className="text-center text-xl text-gray-900 font-headers pb-10">Edit Account</h1>
			<FormInputField
				htmlFor="firstname"
				text="firstname"
				type="text"
				placeholder="First Name"
				className="mb-3"
				value={firstName}
				changeHandler={(e) => setFirstName(e.target.value)}
			/>
			<FormInputField
				htmlFor="lastname"
				text="lastname"
				type="text"
				placeholder="Last Name"
				className="mb-3"
				value={lastName}
				changeHandler={(e) => setLastName(e.target.value)}
			/>
			<FormInputField
				htmlFor="phone"
				text="phone"
				type="text"
				placeholder="Phone Number"
				className="mb-3"
				value={phone}
				changeHandler={(e) => setPhone(e.target.value)}
			/>
			<FormInputField
				htmlFor="email-address"
				text="email"
				type="email"
				placeholder="Email Address"
				className="mb-8"
				value={email}
				changeHandler={(e) => setEmail(e.target.value)}
			/>
			<div className="flex justify-between items-center">
				<button
					className="flex items-end bg-gray-400 text-gray-100 text-base rounded-md py-1 px-6"
					onClick={() => setOpenEditForm(false)}
				>
					Cancel
				</button>
				<button
					className="flex items-end bg-green-400 text-gray-100 text-base rounded-md py-1 px-6"
					onClick={handleUpdateUser}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default UpdateUserForm;
