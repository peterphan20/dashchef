import { useState } from "react";
import UpdateKitchenForm from "../molecules/UpdateKitchenForm";
import ButtonProfile from "../atoms/ButtonProfile";
import LinkProfileMobile from "../atoms/LinkProfileMobile";
import ModalDelete from "../molecules/ModalDelete";
import { useParams } from "react-router-dom";

const EditKitchenMobile = ({
	phone,
	setPhone,
	email,
	setEmail,
	authResponse,
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
	openEditKitchenForm,
	setOpenEditKitchenForm,
	handleUpdateKitchen,
	handleDeleteKitchen,
}) => {
	const [openDeleteKitchenModal, setOpenDeleteKitchenModal] = useState(false);
	const { kitchenID } = useParams();

	return (
		<div>
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
					clickHandler={() => setOpenEditKitchenForm(true)}
				/>
			)}
			<LinkProfileMobile placeholder="Add menu item" link="/create/menu-item" />
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
					clickHandler={() => setOpenDeleteKitchenModal(true)}
				/>
			)}
		</div>
	);
};

export default EditKitchenMobile;
