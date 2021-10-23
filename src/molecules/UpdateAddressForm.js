import React from "react";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import { USStates } from "../helpers/geoState";
import ButtonFormSmall from "../atoms/ButtonFormSmall";

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
	setOpenEditAddress,
	handleUpdateUser,
}) => {
	return (
		<div className="-space-y-px px-5 pt-10 pb-5 border-t border-b border-gray-300 w-full h-full">
			<h1 className="text-center text-3xl text-gray-900 font-headers pb-10">Edit Address</h1>
			<FormInputField
				htmlFor="address"
				text="address"
				type="text"
				placeholder="Street Address"
				autoComplete="street-address"
				value={address}
				changeHandler={(e) => setAddress(e.target.value)}
			/>
			<FormInputField
				htmlFor="apartment-number"
				text="aptNumber"
				type="text"
				placeholder="Apt, suite, etc."
				value={aptNumber}
				changeHandler={(e) => setAptNumber(e.target.value)}
			/>
			<FormInputField
				htmlFor="city"
				text="city"
				type="text"
				placeholder="City/province"
				autoComplete="address-level2"
				value={city}
				changeHandler={(e) => setCity(e.target.value)}
			/>
			<Dropdown
				options={USStates}
				select={geoState}
				placeholder="State/Province"
				onSelectedChange={(e) => setGeoState(e.target.value)}
			/>
			<FormInputField
				htmlFor="zipcode"
				text="zipcode"
				type="text"
				placeholder="Zip/Postal Code"
				className="mb-8"
				autoComplete="postal-code"
				value={zipcode}
				changeHandler={(e) => setZipCode(e.target.value)}
			/>
			<div className="flex justify-between items-center">
				<ButtonFormSmall
					className="bg-gray-400"
					placeholder="Cancel"
					clickHandler={() => setOpenEditAddress(false)}
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

export default UpdateAddressForm;
