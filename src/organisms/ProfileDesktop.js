import React from "react";

const ProfileDesktop = ({
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
	return (
		<div className="px-4 pt-10 w-full h-full min-h-screen lg:max-w-7xl lg:mx-auto">
			<div className="border border-gray-600 px-5 py-7">
				<h1 className="font-headers text-3xl">Profile</h1>
			</div>
		</div>
	);
};

export default ProfileDesktop;
