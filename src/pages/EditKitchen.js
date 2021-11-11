import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import UpdateKitchenForm from "../molecules/UpdateKitchenForm";
import ButtonProfile from "../atoms/ButtonProfile";
import LinkProfile from "../atoms/LinkProfile";
import { getKitchen, deleteKitchen, updateKitchen } from "../api/kitchensAPI";
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
	const [authResponse, setAuthResponse] = useState(true);

	const { kitchenID } = useParams();
	const history = useHistory();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(kitchenID);
			if (!data || !data.rows) {
				history.push("/");
			} else {
				const kitchenData = data.rows[0];
				setEmail(kitchenData.email);
				setPhone(kitchenData.phone);
				const splitAddress = kitchenData.address.split(", ");
				if (splitAddress[0]) setAddress(splitAddress[0]);
				if (splitAddress[1]) setCity(splitAddress[1]);
				if (splitAddress[2]) setGeoState(splitAddress[2]);
				if (splitAddress[3]) setZipCode(splitAddress[3]);
				if (!splitAddress[4]) {
					setAptNumber("");
				} else {
					setAptNumber(splitAddress[4]);
				}
			}
		}
		fetchKitchen();
	}, [kitchenID, history]);

	const handleUpdateKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}${
			aptNumber ? ", " + aptNumber : ""
		}`;

		console.log("address string", addressStr);

		const updatedKitchenObject = {
			email,
			address: addressStr,
			phone,
		};

		const apiResponse = await updateKitchen(kitchenID, updatedKitchenObject, token);
		console.log("api response here", apiResponse);
		if (apiResponse.code !== 200) {
			console.log("update failed");
			setAuthResponse(false);
		} else {
			console.log("update passed");
			setOpenEditKitchenForm(false);
		}
	};

	const handleDeleteKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const apiResponse = await deleteKitchen(kitchenID, token);
		if (apiResponse.code !== 200) {
			console.log("delete failed");
			setAuthResponse(false);
		} else {
			console.log("delete passed");
			history.push("/");
		}
	};

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
			<h1 className="text-2xl font-headers text-center pt-5">Update your kitchen</h1>
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
					handleUpdateKitchen={handleUpdateKitchen}
					setOpenEditKitchenForm={setOpenEditKitchenForm}
					authResponse={authResponse}
				/>
			) : (
				<ButtonProfile
					placeholder="Edit kitchen information"
					className="border-t mt-5"
					modalHandler={() => setOpenEditKitchenForm(true)}
				/>
			)}
			<LinkProfile placeholder="Add menu item" link="create/menu-item" />
			{openDeleteKitchenModal ? (
				<ModalDelete
					modalHandler={setOpenDeleteKitchenModal}
					placeholder="kitchen"
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
