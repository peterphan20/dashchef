import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../api/usersAPI";
import { USER_LOGOUT } from "../constants";
import ProfileMobile from "../organisms/ProfileMobile";
import ProfileDesktop from "../organisms/ProfileDesktop";

const Profile = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isMobile, setIsMobile] = useState(false);
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
		async function getUserData() {
			const token = localStorage.getItem("authToken");
			if (!token) {
				history.push("/");
			}
		}
		getUserData();
	}, [history]);

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
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setPhone(user.phone);
		console.log("address", user.address);

		// if (splitAddress[0]) setAddress(splitAddress[0]);
		// if (splitAddress[1]) setCity(splitAddress[1]);
		// if (splitAddress[2]) setGeoState(splitAddress[2]);
		// if (splitAddress[3]) setZipCode(splitAddress[3]);
		// if (!splitAddress[4]) {
		// 	setAptNumber("");
		// } else {
		// 	setAptNumber(splitAddress[4]);
		// }
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
		<div className="bg-gray-100 w-full h-full">
			{isMobile ? (
				<ProfileMobile
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
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
					handleSignOut={handleSignOut}
					openEditForm={openEditForm}
					setOpenEditForm={setOpenEditForm}
					openEditAddress={openEditAddress}
					setOpenEditAddress={setOpenEditAddress}
					authResponse={authResponse}
				/>
			) : (
				<ProfileDesktop
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
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
					handleSignOut={handleSignOut}
					openEditForm={openEditForm}
					setOpenEditForm={setOpenEditForm}
					openEditAddress={openEditAddress}
					setOpenEditAddress={setOpenEditAddress}
					authResponse={authResponse}
				/>
			)}
		</div>
	);
};

export default Profile;
