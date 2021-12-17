import React from "react";
import { useSelector } from "react-redux";
import UpdateUserForm from "../molecules/UpdateUserForm";
import UpdateAddressForm from "../molecules/UpdateAddressForm";
import ButtonProfile from "../atoms/ButtonProfile";
import LinkProfile from "../atoms/LinkProfile";
import defaultAvatar from "../assets/default-avatar.jpg";

const ProfileMobile = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phone,
	setPhone,
	email,
	setEmail,
	handleUpdate,
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
	openEditForm,
	setOpenEditForm,
	openEditAddress,
	setOpenEditAddress,
	handleSignOut,
}) => {
	const user = useSelector((state) => state.userReducer);

	return (
		<div className="flex flex-col justify-start items-center py-5 min-h-screen">
			<div className="w-32 h-32">
				<img
					src={user.avatarURL ? user.avatarURL : defaultAvatar}
					alt="user's avatar"
					className="rounded-full"
				/>
			</div>
			<div className="flex flex-col justify-center items-center pt-3">
				<button className="text-sm text-blue-400 mb-1">
					{user.avatarURL ? <span>Update picture</span> : <span>Add a photo</span>}
				</button>
				<h1 className="text-2xl font-body font-semibold">
					{user.firstName} {user.lastName}
				</h1>
			</div>
			{openEditForm ? (
				<UpdateUserForm
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					phone={phone}
					setPhone={setPhone}
					email={email}
					setEmail={setEmail}
					handleUpdate={handleUpdate}
					setOpenEditForm={setOpenEditForm}
					authResponse={authResponse}
				/>
			) : (
				<ButtonProfile
					placeholder="Edit profile"
					className="border-t mt-10"
					modalHandler={() => setOpenEditForm(true)}
				/>
			)}
			{openEditAddress ? (
				<UpdateAddressForm
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
					setOpenEditAddress={setOpenEditAddress}
					authResponse={authResponse}
				/>
			) : (
				<ButtonProfile placeholder="Edit Address" modalHandler={() => setOpenEditAddress(true)} />
			)}
			<div className="flex flex-col justify-center items-center font-body w-full h-full">
				{user.isChef && !user.kitchenID ? (
					<LinkProfile link="/create/kitchen" placeholder="Create a kitchen" />
				) : null}
				{user.kitchenID ? (
					<LinkProfile link={`/edit/kitchen/${user.kitchenID}`} placeholder="Edit your kitchen" />
				) : null}
				<ButtonProfile placeholder="Logout" modalHandler={handleSignOut} />
			</div>
		</div>
	);
};

export default ProfileMobile;
