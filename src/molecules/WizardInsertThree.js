import React from "react";
import { useDispatch } from "react-redux";
import InputFieldSignup from "../atoms/InputFieldSignup";
import Dropdown from "../atoms/Dropdown";
import { toggleHideSignUpModal } from "../actions/modalAction";
import { USStates } from "../helpers/geoState";

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
				onClick={() => dispatch(toggleHideSignUpModal())}
			>
				<i className="fas fa-times"></i>
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 pt-5 pb-8">
				Sign up for Dashchef
			</h1>
			<div className="rounded-md -space-y-px mb-5">
				<InputFieldSignup
					type="text"
					htmlFor="phone"
					text="phone"
					className="mb-3"
					placeholder="Phone"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<InputFieldSignup
					type="text"
					htmlFor="address"
					text="address"
					className="mb-3"
					placeholder="Address"
					value={address}
					changeHandler={(e) => setAddress(e.target.value)}
				/>
				<InputFieldSignup
					type="text"
					htmlFor="aptNumber"
					text="aptNumber"
					className="mb-3"
					placeholder="Apt, suite, etc."
					value={aptNumber}
					changeHandler={(e) => setAptNumber(e.target.value)}
				/>
				<InputFieldSignup
					type="text"
					htmlFor="city"
					text="city"
					className="mb-3"
					placeholder="City"
					value={city}
					changeHandler={(e) => setCity(e.target.value)}
				/>
				<Dropdown
					options={USStates}
					select={geoState}
					onSelectedChange={(e) => setGeoState(e.target.value)}
				/>
				<InputFieldSignup
					type="text"
					htmlFor="zipCode"
					text="zipCode"
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
