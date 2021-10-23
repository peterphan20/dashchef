import React from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import { USStates } from "../helpers/geoState";
import { HIDE_SIGN_UP_MODAL } from "../constants";

const WizardInsertThree = ({
	phone,
	setPhone,
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
	authResponse,
}) => {
	const dispatch = useDispatch();

	const response = authResponse ? (
		<div>
			<p>Account successfully created!</p>
		</div>
	) : (
		<div>
			<p>You messed up</p>
		</div>
	);

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
					htmlFor="phone"
					text="phone"
					type="text"
					className="mb-3"
					placeholder="Phone"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<FormInputField
					htmlFor="address"
					text="address"
					type="text"
					className="mb-3"
					placeholder="Street Address"
					value={address}
					changeHandler={(e) => setAddress(e.target.value)}
				/>
				<FormInputField
					htmlFor="apartment-number"
					text="aptNumber"
					type="text"
					className="mb-3"
					placeholder="Apt, suite, etc."
					value={aptNumber}
					changeHandler={(e) => setAptNumber(e.target.value)}
				/>
				<FormInputField
					htmlFor="city"
					text="city"
					type="text"
					className="mb-3"
					placeholder="City"
					value={city}
					changeHandler={(e) => setCity(e.target.value)}
				/>
				<Dropdown
					options={USStates}
					select={geoState}
					placeholder="City/District"
					onSelectedChange={(e) => setGeoState(e.target.value)}
				/>
				<FormInputField
					htmlFor="zipCode"
					text="zipCode"
					type="text"
					className="my-3"
					placeholder="Zip/Postal Code"
					value={zipcode}
					changeHandler={(e) => setZipCode(e.target.value)}
				/>
				{authResponse === null ? "" : response}
			</div>
		</>
	);
};

export default WizardInsertThree;
