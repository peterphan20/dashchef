import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.jpg";
import { updateUser } from "../api/usersAPI";
import UpdateUserForm from "../molecules/UpdateUserForm";
import UpdateAddressForm from "../molecules/UpdateAddressForm";
import ButtonProfile from "../atoms/ButtonProfile";
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
	const [authResponse, setAuthResponse] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		window.scrollTo(0, 0);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setPhone(user.phone);
		setAddress(user.address);
	}, [user, firstName, lastName]);

	const handleSignOut = async () => {
		localStorage.removeItem("authToken");
		// TODO: Dispatch USER_LOGOUT
		dispatch({ type: USER_LOGOUT });
		history.push("/");
	};

	const handleUpdateUser = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const userObject = {
			firstName,
			lastName,
			email,
			address,
			phone,
		};

		const apiResponse = await updateUser(userObject);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			history.push("/");
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
					handleUpdateUser={handleUpdateUser}
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
					handleUpdateUser={handleUpdateUser}
					authResponse={authResponse}
				/>
			) : (
				<ButtonProfile placeholder="Edit Address" modalHandler={() => setOpenEditAddress(true)} />
			)}
			<div className="flex flex-col justify-center items-center text-gray-900 font-body w-full h-full">
				<Link
					to="/create-kitchen"
					className="flex justify-between items-center bg-gray-50 text-gray-900 text-lg border-b border-gray-300 py-4 px-3 w-full h-full"
				>
					Add a kitchen
					<i className="fas fa-chevron-right text-gray-400"></i>
				</Link>
				<ButtonProfile placeholder="Logout" modalHandler={handleSignOut} />
			</div>
		</div>
	);
};

export default Profile;
