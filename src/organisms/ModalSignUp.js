import { useState } from "react";
import { useDispatch } from "react-redux";
import RenderWizardButton from "../molecules/RenderWizardButton";
import WizardInsertOne from "../molecules/WizardInsertOne";
import WizardInsertTwo from "../molecules/WizardInsertTwo";
import WizardInsertThree from "../molecules/WizardInsertThree";
import { createUser } from "../api/usersAPI";
import { CREATE_USER } from "../constants/userActionTypes";
import { CREATE_CHEF } from "../constants/chefActionTypes";
import { createChef } from "../api/chefsAPI";
import { useHistory } from "react-router";

const ModalSignUp = () => {
	const [stepNumber, setStepNumber] = useState(1);
	const [authResponse, setAuthResponse] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [isChef, setIsChef] = useState(null);
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const handleUserSignup = async (userObject) => {
		const apiResponse = await createUser(userObject);
		if (apiResponse.code !== 201) {
			setAuthResponse(false);
			console.log("There was an error while creating the user", apiResponse);
			return;
		}
		console.log("HERE IS THE API RESPONSE: ", apiResponse);
		setAuthResponse(true);

		// 	{
		// 		"id": 19,
		// 		"first_name": "rewrwe",
		// 		"last_name": "rewrwe",
		// 		"email": "rewrwerwe",
		// 		"password": "$2b$10$lNX62ifwXIM1muR0LrKpaeOIcERv21hTf/QIDF1uDO8iq1iQofzq6",
		// 		"address": "12927 DEER SAGE COURT, HOUSTON, ALABAMA 77041",
		// 		"phone": "7134981648",
		// 		"signup_date": "2021-10-20T04:24:24.359Z",
		// 		"last_seen_date": "2021-10-20T04:24:24.359Z",
		// 		"avatar_url": null
		// }

		// TODO: CREATE AND DISPATCH PAYLOAD
		const payload = {
			userID: apiResponse.data.id,
			firstName: apiResponse.data.firstname,
			lastName: apiResponse.data.lastname,
			created: true,
		};
		console.log("user's payload ", payload);
		dispatch({ type: CREATE_USER, payload });
		history.push("/");
	};

	const handleChefSignup = async (chefObject) => {
		const apiResponse = await createChef(chefObject);
		if (apiResponse.code !== 201) {
			setAuthResponse(false);
			console.log("Bad request");
		}
		setAuthResponse(true);
		const payload = {
			chefID: apiResponse.data.id,
			firstName: apiResponse.data.firstName,
			lastName: apiResponse.data.lastName,
			create: true,
		};
		dispatch({ type: CREATE_CHEF, payload });
	};

	const handleSignup = () => {
		const addressStr = `${address}${
			aptNumber ? ", " + aptNumber : ""
		}, ${city}, ${geoState} ${zipcode}`;

		const userObj = {
			firstname,
			lastname,
			email,
			password,
			address: addressStr.toUpperCase(),
			phone,
		};

		if (isChef) {
			// TODO
			handleChefSignup(userObj);
		} else if (isChef === false) {
			console.log("is not chef ===>")
			handleUserSignup(userObj);
		}
	};

	const renderWizardInserts = () => {
		switch (true) {
			case stepNumber === 2:
				return (
					<WizardInsertTwo
						firstname={firstname}
						setFirstname={setFirstname}
						lastname={lastname}
						setLastname={setLastname}
						isChef={isChef}
						setIsChef={setIsChef}
					/>
				);
			case stepNumber === 3:
				return (
					<WizardInsertThree
						phone={phone}
						setPhone={setPhone}
						address={address}
						setAddress={setAddress}
						aptNumber={aptNumber}
						setAptNumber={setAptNumber}
						city={city}
						setCity={setCity}
						geoState={geoState}
						setGeoState={setGeoState}
						zipcode={zipcode}
						setZipCode={setZipCode}
						authResponse={authResponse}
					/>
				);
			default:
				return (
					<WizardInsertOne
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
					/>
				);
		}
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow px-8 pt-8 pb-6 mb-20 z-20"
		>
			{renderWizardInserts()}
			<RenderWizardButton
				stepNumber={stepNumber}
				setStepNumber={setStepNumber}
				handleSignup={handleSignup}
			/>
		</div>
	);
};

export default ModalSignUp;
