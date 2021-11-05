import { useState } from "react";
import { useHistory, useParams } from "react-router";
import ButtonProfile from "../atoms/ButtonProfile";
import UpdateKitchenForm from "../molecules/UpdateKitchenForm";
import { deleteKitchen } from "../api/kitchensAPI";
import ModalDelete from "../molecules/ModalDelete";

const EditKitchen = () => {
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");
	const [openEditKitchenForm, setOpenEditKitchenForm] = useState(false);
	const [openDeleteKitchenModal, setOpenDeleteKitchenModal] = useState(false);
	// const [stepNumber, setStepNumber] = useState(1);
	const [authResponse, setAuthResponse] = useState(null);

	const { kitchenID } = useParams();
	const history = useHistory();

	const handleUpdate = () => {};

	const handleDeleteKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const apiResponse = await deleteKitchen(kitchenID, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			history.push("/");
		}
	};

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<h1 className="text-2xl font-headers text-center pt-5">Edit your kitchen</h1>
			{openEditKitchenForm ? (
				<UpdateKitchenForm
					phone={phone}
					setPhone={setPhone}
					email={email}
					setEmail={setEmail}
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
					handleUpdate={handleUpdate}
					setOpenEditKitchenForm={setOpenEditKitchenForm}
					authResponse={authResponse}
				/>
			) : (
				<ButtonProfile
					placeholder="Edit kitchen information"
					className="border-t mt-8"
					modalHandler={() => setOpenEditKitchenForm(true)}
				/>
			)}
			<ButtonProfile placeholder="Add menu item" />
			{openDeleteKitchenModal ? (
				<ModalDelete
					modalHandler={setOpenDeleteKitchenModal}
					text="kitchen"
					clickHandler={() => handleDeleteKitchen(kitchenID)}
				/>
			) : (
				<ButtonProfile
					placeholder="Delete Kitchen"
					className="text-red-600"
					modalHandler={() => setOpenDeleteKitchenModal(true)}
				/>
			)}
		</div>
	);
};

export default EditKitchen;
