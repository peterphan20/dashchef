import { useDispatch } from "react-redux";
import FormInputField from "../molecules/FormInputField";
import Dropdown from "../molecules/Dropdown";
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

	return (
		<>
			<button
				className="flex self-end text-sm text-gray-400"
				onMouseDown={() => dispatch({ type: HIDE_SIGN_UP_MODAL })}
			>
				<i className="fa-solid fa-xmark" />
			</button>
			<h1 className="text-left text-3xl font-accent font-extrabold text-gray-900 pt-5 pb-5">
				Sign up for Dashchef
			</h1>
			{authResponse ? null : (
				<p className="text-center text-lg text-red-600 font-body pb-5">Invalid user credentials</p>
			)}
			<div className="rounded-md -space-y-px mb-5">
				<FormInputField
					htmlFor="phone"
					text="phone"
					type="text"
					placeholder="Phone"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<FormInputField
					htmlFor="address"
					text="address"
					type="text"
					placeholder="Street Address"
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
					value={city}
					changeHandler={(e) => setCity(e.target.value)}
				/>
				<Dropdown
					options={USStates}
					select={geoState}
					placeholder="City/Province"
					onSelectedChange={(e) => setGeoState(e.target.value)}
				/>
				<FormInputField
					htmlFor="zipCode"
					text="zipCode"
					type="text"
					placeholder="Zip/Postal Code"
					value={zipcode}
					changeHandler={(e) => setZipCode(e.target.value)}
				/>
				<div></div>
			</div>
		</>
	);
};

export default WizardInsertThree;
