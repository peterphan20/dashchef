import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import UpdateUserForm from "../molecules/UpdateUserForm";
import UpdateAddressForm from "../molecules/UpdateAddressForm";
import ButtonProfile from "../atoms/ButtonProfile";
import LinkMobileProfile from "../atoms/LinkMobileProfile";
import defaultAvatar from "../assets/default-avatar.jpg";
import { updateUser } from "../api/usersAPI";
import { USER_LOGOUT } from "../constants";

const Profile = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [aptNumber, setAptNumber] = useState("");
	const [city, setCity] = useState("");
	const [geoState, setGeoState] = useState(null);
	const [zipcode, setZipCode] = useState("");
	const [openEditForm, setOpenEditForm] = useState(false);
	const [openEditAddress, setOpenEditAddress] = useState(false);
	const [authResponse, setAuthResponse] = useState(null);

	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		window.scrollTo(0, 0);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setPhone(user.phone);

		const splitAddress = user.address.split(",");
		if (splitAddress[0]) setAddress(splitAddress[0]);
		if (splitAddress[1]) setCity(splitAddress[1]);
		if (splitAddress[2]) setGeoState(splitAddress[2]);
		if (splitAddress[3]) setZipCode(splitAddress[3]);
		if (!splitAddress[4]) {
			setAptNumber("");
		} else {
			setAptNumber(splitAddress[4]);
		}
	}, [user]);

	const handleSignOut = async () => {
		localStorage.removeItem("authToken");
		dispatch({ type: USER_LOGOUT });
		history.push("/");
	};

	const handleUpdate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState} ${zipcode}, ${
			aptNumber ? ", " + aptNumber : ""
		}`;

		const userObject = {
			firstName,
			lastName,
			email,
			address: addressStr,
			phone,
		};
		console.log(userObject);

		const apiResponse = await updateUser(user.id, userObject, token);
		console.log(apiResponse);
		if (apiResponse.code !== 200) {
			console.log("api response failed");
			setAuthResponse(false);
		} else {
			console.log("api response passed, user updated");
			setAuthResponse(true);
		}
	};

	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 py-5 w-full h-full min-h-screen">
			<div className="w-32 h-32">
				<img src={defaultAvatar} alt="default avatar" className="rounded-full" />
			</div>
			<div className="flex flex-col justify-center items-center pt-3">
				<button className="text-sm text-blue-400 mb-1">Add a photo</button>
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
					<LinkMobileProfile link="/create/kitchen" placeholder="Create a kitchen" />
				) : null}
				{user.kitchenID ? (
					<LinkMobileProfile
						link={`/edit/kitchen/${user.kitchenID}`}
						placeholder="Edit your kitchen"
					/>
				) : null}
				<ButtonProfile placeholder="Logout" modalHandler={handleSignOut} />
			</div>
		</div>
	);
};

export default Profile;
