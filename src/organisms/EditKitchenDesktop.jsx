import React from "react";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";
import { USStates } from "../helpers/geoState";

const EditKitchenDesktop = ({
	phone,
	setPhone,
	email,
	setEmail,
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
	handleUpdateKitchen,
}) => {
	return (
		<div className="flex flex-col px-4 py-10 w-full h-full min-h-screen">
			<div className="bg-gray-200 border border-gray-300 px-16 py-12 lg:mx-auto lg:w-1/4 xl:w-1/3">
				<h1 className="font-headers font-bold text-3xl mb-5">Kitchen</h1>
				<FormInputField
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
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
					placeholder="City"
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
					autoComplete="postal-code"
					value={zipcode}
					changeHandler={(e) => setZipCode(e.target.value)}
				/>
				<ButtonProfileDesktop
					placeholder="Save changes"
					className="bg-green-400 text-gray-100 mt-5"
					clickHandler={handleUpdateKitchen}
				/>
			</div>
		</div>
	);
};

export default EditKitchenDesktop;
