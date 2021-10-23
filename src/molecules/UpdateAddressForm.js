import React from "react";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import { USStates } from "../helpers/geoState";

const UpdateAddressForm = ({
	address,
	setAddress,
	aptNumber,
	setAptNumber,
	city,
	setCity,
	geoState,
	setGeoState,
	zipcode,
	setZipCode,
	setOpenEditForm,
	handleUpdateUser,
}) => {
	return (
		<div className="-space-y-px px-5 pt-5 pb-5 my-8 border border-gray-300 rounded-md w-full h-full">
			<h1 className="text-center text-xl text-gray-900 font-headers pb-10">Edit Account</h1>
			<FormInputField
				htmlFor="address"
				text="address"
				type="text"
				placeholder="Address"
				className="mb-3"
				value={address}
				changeHandler={(e) => setAddress(e.target.value)}
			/>
			<FormInputField
				htmlFor="lastname"
				text="lastname"
				type="text"
				placeholder="Last Name"
				className="mb-3"
				value={aptNumber}
				changeHandler={(e) => setAptNumber(e.target.value)}
			/>
			<FormInputField
				htmlFor="phone"
				text="phone"
				type="text"
				placeholder="Phone Number"
				className="mb-3"
				value={city}
				changeHandler={(e) => setCity(e.target.value)}
			/>
			<Dropdown
				options={USStates}
				select={geoState}
				onSelectedChange={(e) => setGeoState(e.target.value)}
			/>
			<FormInputField
				htmlFor="email-address"
				text="email"
				type="email"
				placeholder="Email Address"
				className="mb-3"
				value={zipcode}
				changeHandler={(e) => setZipCode(e.target.value)}
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

export default UpdateAddressForm;
