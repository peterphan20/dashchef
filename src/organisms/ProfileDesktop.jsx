import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteKitchen } from "../api/kitchensAPI";
import { USStates } from "../helpers/geoState";
import ModalDelete from "../molecules/ModalDelete";
import FormInputField from "../molecules/FormInputField";
import Dropdown from "../molecules/Dropdown";
import LinkProfileDesktop from "../atoms/LinkProfileDesktop";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";
import defaultAvatar from "../assets/default-avatar.jpg";
import Avatar from "../molecules/Avatar";
import { useDispatch } from "react-redux";
import { SELECTED_KITCHEN_DELETE, SELECTED_MENU_ITEM_DELETE, USER_UPDATE } from "../constants";
import { deleteUser } from "../api/usersAPI";
import { deleteChef } from "../api/chefsAPI";

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
	const [isDeleteKitchenOpen, setIsDeleteKitchenOpen] = useState(false);
	const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const { userID } = useParams();

	const handleDeleteKitchen = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;
		const apiResponse = await deleteKitchen(user.kitchenID, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			const payload = {
				isChef: true,
				id: parseInt(userID),
				kitchenID: null,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				address: user.address,
				phone: user.phone,
				avatarURL: user.avatarURL,
				loggedIn: true,
			};
			dispatch({ type: USER_UPDATE, payload: payload });
			dispatch({ type: SELECTED_KITCHEN_DELETE });
			dispatch({ type: SELECTED_MENU_ITEM_DELETE });
		}
	};

	const handleDeleteUser = async (token) => {
		const apiResponse = await deleteUser(userID, token);
		if (apiResponse.code === 200) navigateTo("/");
	};

	const handleDeleteChef = async (token) => {
		const apiResponse = await deleteChef(userID, token);
		if (apiResponse.code === 200) navigateTo("/");
	};

	const handleDeleteAccount = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;
		if (user.isChef) {
			handleDeleteChef(token);
		} else {
			handleDeleteUser(token);
		}
	};

	return (
		<div className="flex flex-col py-10 w-full h-full min-h-screen lg:max-w-3xl lg:mx-auto">
			{isDeleteKitchenOpen ? (
				<ModalDelete
					modalHandler={setIsDeleteKitchenOpen}
					placeholder="kitchen"
					clickHandler={() => handleDeleteKitchen(user.kitchenID)}
				/>
			) : null}
			{isDeleteUserOpen ? (
				<ModalDelete
					modalHandler={setIsDeleteUserOpen}
					placeholder="user"
					clickHandler={handleDeleteAccount}
				/>
			) : null}
			<div className="border border-gray-300 px-16 py-12 mb-8">
				{authResponse === null ? null : authResponse ? (
					<p className="bg-green-400 text-gray-100 rounded-md py-1 px-4 transform translate-y-full transition duration-300 ease-in">
						Your profile has been updated
					</p>
				) : (
					<p className="bg-red-400 py-1 px-4 rounded-md transform translate-y-full transition duration-300 ease-in">
						Something went wrong
					</p>
				)}
				<Avatar
					link={`/image-upload/user/${userID}`}
					src={user.avatarURL ? user.avatarURL : defaultAvatar}
					alt="User's avatar"
				/>
				<div className="grid grid-cols-6 gap-x-2">
					<h1 className="col-span-6 font-headers font-bold text-3xl mb-5 mt-7">Profile</h1>
					<FormInputField
						htmlFor="firstname"
						text="firstname"
						type="text"
						placeholder="First Name"
						gridSpan="col-span-3"
						value={firstName}
						changeHandler={(e) => setFirstName(e.target.value)}
					/>
					<FormInputField
						htmlFor="lastname"
						text="lastname"
						type="text"
						placeholder="Last Name"
						gridSpan="col-span-3"
						value={lastName}
						changeHandler={(e) => setLastName(e.target.value)}
					/>
					<FormInputField
						htmlFor="email-address"
						text="email"
						type="email"
						placeholder="Email Address"
						gridSpan="col-span-4"
						value={email}
						changeHandler={(e) => setEmail(e.target.value)}
					/>
					<FormInputField
						htmlFor="phone"
						text="phone"
						type="text"
						placeholder="Phone Number"
						gridSpan="col-span-3"
						value={phone}
						changeHandler={(e) => setPhone(e.target.value)}
					/>
					<FormInputField
						htmlFor="address"
						text="address"
						type="text"
						placeholder="Street Address"
						autoComplete="street-address"
						gridSpan="col-span-5"
						value={address}
						changeHandler={(e) => setAddress(e.target.value)}
					/>
					<FormInputField
						htmlFor="apartment-number"
						text="aptNumber"
						type="text"
						placeholder="Apt, suite, etc."
						gridSpan="col-span-1"
						value={aptNumber}
						changeHandler={(e) => setAptNumber(e.target.value)}
					/>
					<FormInputField
						htmlFor="city"
						text="city"
						type="text"
						placeholder="City"
						autoComplete="address-level2"
						gridSpan="col-span-3"
						value={city}
						changeHandler={(e) => setCity(e.target.value)}
					/>
					<Dropdown
						options={USStates}
						select={geoState}
						guessValue={geoState}
						placeholder="State/Province"
						onSelectedChange={(e) => setGeoState(e.target.value)}
					/>
					<FormInputField
						htmlFor="zipcode"
						text="zipcode"
						type="text"
						placeholder="Zip/Postal Code"
						autoComplete="postal-code"
						gridSpan="col-span-2"
						value={zipcode}
						changeHandler={(e) => setZipCode(e.target.value)}
					/>
					<ButtonProfileDesktop
						placeholder="Save changes"
						className="col-span-2 bg-green-400 text-gray-100"
						clickHandler={handleUpdate}
					/>
				</div>
			</div>
			{!user.isChef ? null : user.isChef && user.kitchenID ? (
				<div className="border border-gray-300 px-16 py-6 text-gray-900 mb-5">
					<h1 className="font-headers font-bold text-2xl mb-2">Kitchen</h1>
					<div className="flex flex-col justify-center items-start mb-5">
						<span className="block font-body text-lg mb-3">
							Want to make changes to your kitchen?
						</span>
						<LinkProfileDesktop
							link={`/edit/kitchen/${user.kitchenID}`}
							placeholder="Update kitchen"
							className="text-gray-900 bg-gray-50 border border-gray-300 mb-5"
						/>
						<LinkProfileDesktop
							link="/create/menu-item"
							placeholder="Add menu item"
							className="bg-gray-50 text-blue-600 border border-gray-300 mb-5"
						/>
						<ButtonProfileDesktop
							placeholder="Delete Kitchen"
							className="bg-red-600 text-gray-100"
							clickHandler={() => setIsDeleteKitchenOpen(true)}
						/>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-4 gap-1 border border-gray-300 px-16 py-12 text-gray-900 mb-5">
					<p className="col-span-4 block font-body font-bold text-xl mb-3">
						Want to start your own kitchen?
					</p>
					<LinkProfileDesktop
						className="col-span-1 bg-gray-50 text-blue-600 border border-gray-300 px-0"
						link="/create/kitchen"
						placeholder="Create a kitchen"
					/>
				</div>
			)}
			<div className="grid grid-cols-4 border border-gray-300 px-16 py-12 mb-10">
				<span className="col-span-4 block font-body font-bold text-red-600 text-xl">
					Delete account
				</span>
				{user.isChef ? (
					<span className="col-span-4 text-gray-900 text-sm mb-4">
						You must delete your kitchen before you can delete this account
					</span>
				) : (
					<span className="col-span-4 text-gray-900 text-sm mb-4">
						There is no going back once you delete your account.
					</span>
				)}
				<ButtonProfileDesktop
					className="col-span-1 bg-gray-50 text-red-600 border border-gray-300 px-0 disabled:bg-gray-300 disabled:text-red-700"
					placeholder="Delete your account"
					clickHandler={() => setIsDeleteUserOpen(true)}
					disabled={user.kitchenID}
				/>
			</div>
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
