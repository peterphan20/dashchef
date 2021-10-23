import { useState } from "react";
import Dropdown from "../atoms/Dropdown";
import FormInputField from "../atoms/FormInputField";
import { USStates } from "../helpers/geoState";

const KitchenForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");

	return (
		<div className="bg-gray-100 px-2 py-5 w-full h-full min-h-screen">
			<h1 className="text-center text-3xl font-accents font-bold pb-5">Create your own kitchen</h1>
			<div className="font-body">
				<FormInputField
					htmlFor="kitchen-name"
					text="name"
					type="text"
					placeholder="Name of the kitchen"
					className="mb-5"
          value={name}
					changeHandler={(e) => setName(e.target.value)}
				/>
				<FormInputField
					htmlFor="email-address"
					text="address"
					type="email"
					placeholder="Email Address"
					className="mb-5"
          autoComplete="email"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<FormInputField
					htmlFor="phone"
					text="phone"
					type="text"
					placeholder="Phone Number"
					className="mb-5"
          autoComplete="tel-national"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<FormInputField
					htmlFor="street-address"
					text="address"
					type="text"
					placeholder="Street Address"
					className="mb-5"
          autoComplete="street-address"
					value={address}
					changeHandler={(e) => setAddress(e.target.value)}
				/>
				<FormInputField
					htmlFor="apt-number"
					text="aptNumber"
					type="text"
					placeholder="Apt, suite, etc."
					className="mb-5"
          value={aptNumber}
					changeHandler={(e) => setAptNumber(e.target.value)}
				/>
				<FormInputField
					htmlFor="city"
					text="city"
					type="text"
					placeholder="City"
					className="mb-5"
          autoComplete="address-level2"
					value={city}
					changeHandler={(e) => setCity(e.target.value)}
				/>
				<Dropdown
					htmlFor="geo-state"
					label="State/Province"
					options={USStates}
					select={geoState}
					onSelectedChange={(e) => setGeoState(e.target.value)}
				/>
				<FormInputField
					htmlFor="zipcode"
					text="zipcode"
					type="text"
					placeholder="Zip/Postal code"
					className="mb-5"
          autoComplete="postal-code"
					value={zipcode}
					changeHandler={(e) => setZipCode(e.target.value)}
				/>
				<button className="bg-green-400 text-gray-100 text-lg rounded-md py-2 w-full h-full">
					Create Kitchen
				</button>
			</div>
		</div>
	);
};

export default KitchenForm;
