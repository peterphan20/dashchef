import React from "react";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
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
		<div className="-space-y-px px-5 pt-10 pb-5 mt-8 border-t border-b border-gray-300 w-full h-full">
			<h1 className="text-center text-3xl text-gray-900 font-headers pb-10">Edit Account</h1>
			<FormInputField
				htmlFor="firstname"
				text="firstname"
				type="text"
				placeholder="First Name"
				value={firstName}
				changeHandler={(e) => setFirstName(e.target.value)}
			/>
			<FormInputField
				htmlFor="lastname"
				text="lastname"
				type="text"
				placeholder="Last Name"
				value={lastName}
				changeHandler={(e) => setLastName(e.target.value)}
			/>
			<FormInputField
				htmlFor="phone"
				text="phone"
				type="text"
				placeholder="Phone Number"
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
				<ButtonFormSmall
					className="bg-gray-400"
					placeholder="Cancel"
					clickHandler={() => setOpenEditForm(false)}
				/>
				<ButtonFormSmall
					className="bg-green-400"
					placeholder="Submit"
					clickHandler={handleUpdateUser}
				/>
			</div>
		</div>
	);
};

export default UpdateUserForm;
