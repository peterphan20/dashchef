import React from "react";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import { USStates } from "../helpers/geoState";
import ButtonFormSmall from "../atoms/ButtonFormSmall";

const ProfileDesktop = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
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
	handleUpdate,
	authResponse,
	handleSignOut,
}) => {
	return (
		<div className="flex flex-col px-4 pt-10 w-full h-full min-h-screen lg:max-w-5xl lg:mx-auto">
			<div className="border border-gray-300 px-16 py-12">
				<h1 className="font-headers text-3xl mb-10">Profile</h1>
				<div className="flex gap-5 mb-5 w-full h-full">
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
				</div>
				<div className="flex gap-5 mb-5 w-full h-full">
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
				</div>
				<div className="flex gap-5 mb-5 w-full h-full">
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
				</div>
				<div className="flex gap-7 mb-5 w-full h-full">
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
				</div>
				<ButtonFormSmall placeholder="Save" className="bg-green-400" />
			</div>
		</div>
	);
};

export default ProfileDesktop;
