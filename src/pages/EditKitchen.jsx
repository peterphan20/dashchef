import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKitchen, deleteKitchen, updateKitchen } from "../api/kitchensAPI";
import EditKitchenMobile from "../organisms/EditKitchenMobile";
import EditKitchenDesktop from "../organisms/EditKitchenDesktop";

const EditKitchen = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isMobile, setIsMobile] = useState(false);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");
	const [openEditKitchenForm, setOpenEditKitchenForm] = useState(false);
	const [authResponse, setAuthResponse] = useState(true);

	const { kitchenID } = useParams();
	const navigateTo = useNavigate();

	const trackWindowChanges = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", trackWindowChanges);
		if (windowWidth < 864) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
		return () => {
			window.removeEventListener("resize", trackWindowChanges);
		};
	}, [windowWidth]);

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(kitchenID);
			if (!data || !data.rows) {
				navigateTo("/");
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
	}, [kitchenID, navigateTo]);

	const handleUpdateKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}${
			aptNumber ? ", " + aptNumber : ""
		}`;

		const updatedKitchenObject = {
			email,
			address: addressStr,
			phone,
		};

		const apiResponse = await updateKitchen(kitchenID, updatedKitchenObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			if (isMobile) {
				setOpenEditKitchenForm(false);
			} else {
				history.push("/profile");
			}
		}
	};

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
			{isMobile ? (
				<EditKitchenMobile
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
					authResponse={authResponse}
					openEditKitchenForm={openEditKitchenForm}
					setOpenEditKitchenForm={setOpenEditKitchenForm}
					handleUpdateKitchen={handleUpdateKitchen}
					handleDeleteKitchen={handleDeleteKitchen}
				/>
			) : (
				<EditKitchenDesktop
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
					authResponse={authResponse}
					openEditKitchenForm={openEditKitchenForm}
					setOpenEditKitchenForm={setOpenEditKitchenForm}
					handleUpdateKitchen={handleUpdateKitchen}
					handleDeleteKitchen={handleDeleteKitchen}
				/>
			)}
		</div>
	);
};

export default EditKitchen;
