import { useState } from "react";
import RenderWizardButton from "../molecules/RenderWizardButton";
import WizardInsertOne from "../molecules/WizardInsertOne";
import WizardInsertTwo from "../molecules/WizardInsertTwo";
import WizardInsertThree from "../molecules/WizardInsertThree";

const ModalSignUp = () => {
	const [stepNumber, setStepNumber] = useState(0);
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

	const renderWizardModal = () => {
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
		<div>
			{renderWizardModal}
			<hr className="mt-5 pb-3" />
			<RenderWizardButton stepNumber={stepNumber} setStepNumber={setStepNumber} />
		</div>
	);
};

export default ModalSignUp;
