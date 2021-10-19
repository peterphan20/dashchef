import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleHideSignUpModal } from "../actions/modalAction";
import RenderWizardButton from "../molecules/RenderWizardButton";
import WizardInsertOne from "../molecules/WizardInsertOne";
import WizardInsertTwo from "../molecules/WizardInsertTwo";
import WizardInsertThree from "../molecules/WizardInsertThree";
import { createUser } from "../api/usersAPI";
import { CREATE_USER } from "../constants/userActionTypes";

const ModalSignUp = () => {
	const [stepNumber, setStepNumber] = useState(1);
	const [authResponse, setAuthResponse] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [chef, setChef] = useState(false);
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState("Select State");
	const [zipcode, setZipCode] = useState("");

	const dispatch = useDispatch;
	let addressStr = address + " " + city + " " + geoState + " " + zipcode + " " + aptNumber;
	console.log(addressStr.toUpperCase());

	const handleSignup = async () => {
		let addressStr = address + " " + city + " " + geoState + " " + zipcode + " " + aptNumber;
		const userObj = JSON.stringify({
			firstname,
			lastname,
			email,
			password,
			address: addressStr.toUpperCase(),
			phone,
		});

		const res = await createUser(userObj);

		if (res.code === 201) {
			setAuthResponse(true);
			if (chef) {

			}
			const payload = {
				userID: res.id,
				firstName: res.firstname,
				lastName: res.lastname,
				created: true,
			};
			dispatch({ type: CREATE_USER, payload });
		} else {
			const payload = {
				userID: null,
				firstName: null,
				lastName: null,
				created: false,
			};
			dispatch({ type: CREATE_USER, payload });
			setAuthResponse(false);
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
						chef={chef}
						setChef={setChef}
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
			className="grid place-items-center fixed bg-backdrop top-0 left-0 w-full h-screen z-20"
			onClick={() => dispatch(toggleHideSignUpModal())}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative flex flex-col justify-center item-center bg-gray-100 text-gray-900 font-body rounded shadow px-8 pt-8 pb-2 mb-20 z-20"
			>
				{renderWizardInserts()}
				<RenderWizardButton
					stepNumber={stepNumber}
					setStepNumber={setStepNumber}
					handleSignup={handleSignup}
				/>
			</div>
		</div>
	);
};

export default ModalSignUp;
