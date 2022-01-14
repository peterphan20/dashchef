import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ModalDelete from "../molecules/ModalDelete";
import FormInputField from "../atoms/FormInputField";
import Dropdown from "../atoms/Dropdown";
import LinkProfileDesktop from "../atoms/LinkProfileDesktop";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";
import { deleteKitchen } from "../api/kitchensAPI";
import { USStates } from "../helpers/geoState";
import defaultAvatar from "../assets/default-avatar.jpg";

const ProfileDesktop = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phone,
	setPhone,
	email,
	setEmail,
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
	handleUpdate,
	handleSignOut,
	authResponse,
	setAuthResponse,
}) => {
	const [openDeleteKitchenModal, setOpenDeleteKitchenModal] = useState(false);
	const user = useSelector((state) => state.userReducer);
	const history = useHistory();

	const handleDeleteKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;
		console.log("this is the kitchen id", user.kitchenID);
		const apiResponse = await deleteKitchen(user.kitchenID, token);
		if (apiResponse.code !== 200) {
			console.log("delete failed");
			setAuthResponse(false);
		} else {
			console.log("delete passed");
			history.push("/");
		}
	};

	return (
		<div className="flex flex-col px-4 py-14 w-full h-full min-h-screen lg:max-w-4xl lg:mx-auto">
			{openDeleteKitchenModal ? (
				<ModalDelete
					modalHandler={setOpenDeleteKitchenModal}
					placeholder="kitchen"
					clickHandler={() => handleDeleteKitchen(user.kitchenID)}
				/>
			) : null}
			<div className="bg-gray-200 border border-gray-300 px-16 py-12 mb-8">
				<div className="flex justify-between items-start">
					<h1 className="font-headers font-bold text-3xl mb-5">Profile</h1>
					{authResponse === null ? null : authResponse ? (
						<p className="bg-green-400 text-gray-100 rounded-md py-1 px-4 transform translate-y-full transition duration-300 ease-in">
							Your profile has been updated
						</p>
					) : (
						<p className="bg-red-400 py-1 px-4 rounded-md transform translate-y-full transition duration-300 ease-in">
							Something went wrong
						</p>
					)}
				</div>
				<div className="flex justify-start items-center gap-5 mb-10">
					<div className="w-24 h-24">
						<img
							src={user.avatarURL ? user.avatarURL : defaultAvatar}
							alt="user's avatar"
							className="rounded-full"
						/>
					</div>
					<Link
						to="/image-upload"
						className="bg-gray-100 text-xs rounded-md border border-gray-300 py-2 px-5"
					>
						{user.avatarURL ? <p>Update picture</p> : <p>Add picture</p>}
					</Link>
				</div>
				<div className="flex gap-5 mb-5 w-full h-full">
					<FormInputField
						htmlFor="firstname"
						text="firstname"
						type="text"
						placeholder="First Name"
						value={firstName}
						changeHandler={(e) => setFirstName(e.target.value)}
					/>
					<FormInputField
						htmlFor="lastname"
						text="lastname"
						type="text"
						placeholder="Last Name"
						value={lastName}
						changeHandler={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="flex gap-5 mb-5 w-full h-full">
					<FormInputField
						htmlFor="email-address"
						text="email"
						type="email"
						placeholder="Email Address"
						value={email}
						changeHandler={(e) => setEmail(e.target.value)}
					/>
					<FormInputField
						htmlFor="phone"
						text="phone"
						type="text"
						placeholder="Phone Number"
						value={phone}
						changeHandler={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className="flex gap-5 mb-5 w-full h-full">
					<FormInputField
						htmlFor="address"
						text="address"
						type="text"
						placeholder="Street Address"
						autoComplete="street-address"
						value={address}
						changeHandler={(e) => setAddress(e.target.value)}
					/>
					<FormInputField
						htmlFor="apartment-number"
						text="aptNumber"
						type="text"
						placeholder="Apt, suite, etc."
						value={aptNumber}
						changeHandler={(e) => setAptNumber(e.target.value)}
					/>
				</div>
				<div className="flex gap-7 mb-5 w-full h-full">
					<FormInputField
						htmlFor="city"
						text="city"
						type="text"
						placeholder="City"
						autoComplete="address-level2"
						value={city}
						changeHandler={(e) => setCity(e.target.value)}
					/>
					<Dropdown
						options={USStates}
						select={geoState}
						placeholder="State/Province"
						onSelectedChange={(e) => setGeoState(e.target.value)}
					/>
					<FormInputField
						htmlFor="zipcode"
						text="zipcode"
						type="text"
						placeholder="Zip/Postal Code"
						autoComplete="postal-code"
						value={zipcode}
						changeHandler={(e) => setZipCode(e.target.value)}
					/>
				</div>
				<ButtonProfileDesktop
					placeholder="Save changes"
					className="bg-green-400 text-gray-100"
					clickHandler={handleUpdate}
				/>
			</div>
			{user.isChef && user.kitchenID ? (
				<div className="bg-gray-200 border border-gray-300 px-16 py-12 text-gray-900 mb-10">
					<h1 className="font-headers font-bold text-3xl mb-6">Kitchen</h1>
					<div className="flex flex-col justify-center items-start mb-5">
						<label className="block font-body text-lg mb-5">
							Want to make changes to your kitchen?
						</label>
						<LinkProfileDesktop
							placeholder="Update kitchen"
							className="text-gray-900 bg-gray-100 mb-5"
						/>
						<LinkProfileDesktop
							link="/create/menu-item"
							placeholder="Add menu item"
							className="bg-gray-100 text-blue-600 mb-5"
						/>
						<ButtonProfileDesktop
							placeholder="Delete Kitchen"
							className="bg-red-600 text-gray-100"
							clickHandler={() => setOpenDeleteKitchenModal(true)}
						/>
					</div>
				</div>
			) : (
				<LinkProfileDesktop link="/create/kitchen" placeholder="Create a kitchen" />
			)}
			<div>
				<ButtonProfileDesktop
					className="bg-gray-200 text-red-600 border border-gray-300"
					placeholder="Logout"
					clickHandler={handleSignOut}
				/>
			</div>
		</div>
	);
};

export default ProfileDesktop;
