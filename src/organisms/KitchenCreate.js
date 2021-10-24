import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createKitchen } from "../api/kitchensAPI";
import Dropdown from "../atoms/Dropdown";
import FormInputField from "../atoms/FormInputField";
import { SELECTED_KITCHEN_CREATE, USER_LOGIN } from "../constants";
import { USStates } from "../helpers/geoState";

const KitchenCreate = () => {
	const [authResponse, setAuthResponse] = useState(true);
	const [authResponseDuplicate, setAuthResponseDuplicate] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");

	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer);

	const handleKitchenCreate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}${
			aptNumber ? ", " + aptNumber : ""
		}`;

		const kitchenObject = {
			name,
			email,
			address: addressStr,
			phone,
			id: user.id,
		};

		const apiResponse = await createKitchen(kitchenObject, token);
		console.log("api response", apiResponse);
		if (apiResponse.code === 500) {
			setAuthResponseDuplicate(false);
			console.log("api did not return code 201");
		} else if (apiResponse.code === 400) {
			setAuthResponse(false);
		} else if (apiResponse.code === 201) {
			const payload = {
				id: apiResponse.data.id,
				name: apiResponse.data.name,
				address: apiResponse.data.address,
				phone: apiResponse.data.phone,
			};
			console.log("api response passed, payload", payload);

			const updatedChefPayload = {
				kitchenID: apiResponse.data.id,
			};

			dispatch({ type: SELECTED_KITCHEN_CREATE, payload });
			dispatch({ type: USER_LOGIN, payload: updatedChefPayload });
			setAuthResponse(true);
			history.push("/");
		}
	};

	const validValuesResponse = !authResponse ? (
		<p className="text-center text-red-600 text-lg font-body">Invalid input values.</p>
	) : null;
	const duplicateKeyResponse = !authResponseDuplicate ? (
		<p className="text-center text-red-600 text-lg font-body">
			Name or email has already been used, please try again.
		</p>
	) : null;

	return (
		<div className="bg-gray-100 px-4 pt-10 pb-14 w-full h-full min-h-screen">
			<h1 className="text-center text-3xl font-headers font-bold pb-5">
				Start your very own kitchen
			</h1>
			<div className="font-body">
				<FormInputField
					htmlFor="kitchen-name"
					text="name"
					type="text"
					placeholder="Name of the kitchen"
					value={name}
					changeHandler={(e) => setName(e.target.value)}
				/>
				<FormInputField
					htmlFor="email-address"
					text="address"
					type="email"
					placeholder="Email Address"
					autoComplete="email"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<FormInputField
					htmlFor="phone"
					text="phone"
					type="text"
					placeholder="Phone Number"
					autoComplete="tel-national"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<FormInputField
					htmlFor="street-address"
					text="address"
					type="text"
					placeholder="Street Address"
					autoComplete="street-address"
					value={address}
					changeHandler={(e) => setAddress(e.target.value)}
				/>
				<FormInputField
					htmlFor="apt-number"
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
					htmlFor="geo-state"
					placeholder="State/Province"
					options={USStates}
					select={geoState}
					onSelectedChange={(e) => setGeoState(e.target.value)}
				/>
				<FormInputField
					htmlFor="zipcode"
					text="zipcode"
					type="text"
					placeholder="Zip/Postal code"
					className="mb-8"
					autoComplete="postal-code"
					value={zipcode}
					changeHandler={(e) => setZipCode(e.target.value)}
				/>
				<button
					className="bg-green-400 text-gray-100 text-lg rounded-md py-2 mb-5 w-full h-full"
					onClick={handleKitchenCreate}
				>
					Create Kitchen
				</button>
				{validValuesResponse}
				{duplicateKeyResponse}
			</div>
		</div>
	);
};

export default KitchenCreate;
