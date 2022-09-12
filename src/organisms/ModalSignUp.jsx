import { useState } from "react";
import WizardInsertOne from "../molecules/WizardInsertOne";
import WizardInsertTwo from "../molecules/WizardInsertTwo";
import WizardInsertThree from "../molecules/WizardInsertThree";
import RenderWizardButton from "../molecules/RenderWizardButton";
import { createUser } from "../api/usersAPI";
import { createChef } from "../api/chefsAPI";

const ModalSignUp = ({ setIsSignupOpen }) => {
	const [stepNumber, setStepNumber] = useState(1);
	const [authResponse, setAuthResponse] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [isChef, setIsChef] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState("");
	const [zipcode, setZipCode] = useState("");

	const handleUserSignup = async (userObject) => {
		const apiResponse = await createUser(userObject);
		if (apiResponse.code !== 201) {
			setAuthResponse(false);
			return;
		} else {
			setIsSignupOpen(false);
		}
	};

	const handleChefSignup = async (userObject) => {
		const apiResponse = await createChef(userObject);
		if (apiResponse.code !== 201) {
			setAuthResponse(false);
		} else {
			setIsSignupOpen(false);
		}
	};

	const handleSignup = () => {
		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}${
			aptNumber ? ", " + aptNumber : ""
		}`;

		const userObject = {
			firstName,
			lastName,
			email,
			password,
			address: addressStr.toUpperCase(),
			phone,
		};

		if (isChef === "yes") {
			handleChefSignup(userObject);
		} else if (isChef === "no") {
			handleUserSignup(userObject);
		}
	};

	const renderWizardInserts = () => {
		switch (true) {
			case stepNumber === 2:
				return (
					<WizardInsertTwo
						setIsSignupOpen={setIsSignupOpen}
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						setIsChef={setIsChef}
					/>
				);
			case stepNumber === 3:
				return (
					<WizardInsertThree
						setIsSignupOpen={setIsSignupOpen}
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
						setIsSignupOpen={setIsSignupOpen}
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
			onMouseDown={(e) => e.stopPropagation()}
			className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow px-5 pt-8 pb-6 mb-20 z-20 w-full lg:px-8 lg:w-1/4 xl:1/5"
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
