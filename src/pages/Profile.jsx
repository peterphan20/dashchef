import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser, validateToken } from "../api/usersAPI";
import { getChef, updateChef } from "../api/chefsAPI";
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
	const [geoState, setGeoState] = useState("");
	const [zipcode, setZipCode] = useState("");
	const [openEditForm, setOpenEditForm] = useState(false);
	const [openEditAddress, setOpenEditAddress] = useState(false);
	const [authResponse, setAuthResponse] = useState(null);

	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const user = useSelector((state) => state.userReducer);
	const { userID } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
		async function getUserData() {
			const token = localStorage.getItem("authToken");
			const isChef = localStorage.getItem("isChef");
			if (!token) {
				navigateTo("/");
			} else {
				const apiResponse = await validateToken(token);
				if (!apiResponse.id) return;
				if (isChef === "0") {
					const userApiResponse = await getUser(apiResponse.id);
					const userData = userApiResponse.rows[0];
					setFirstName(userData.firstName);
					setLastName(userData.lastName);
					setEmail(userData.email);
					setPhone(userData.phone);
					const splitAddress = userData.address.split(", ");
					if (splitAddress[0]) setAddress(splitAddress[0]);
					if (splitAddress[1]) setCity(splitAddress[1]);
					if (splitAddress[2]) setGeoState(splitAddress[2]);
					if (splitAddress[3]) setZipCode(splitAddress[3]);
					if (!splitAddress[4]) {
						setAptNumber("");
					} else {
						setAptNumber(splitAddress[4]);
					}
				} else {
					const chefApiResponse = await getChef(apiResponse.id);
					const chefData = chefApiResponse.rows[0];
					setFirstName(chefData.firstName);
					setLastName(chefData.lastName);
					setEmail(chefData.email);
					setPhone(chefData.phone);
					const splitAddress = chefData.address.split(", ");
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
		}
		getUserData();
	}, [navigateTo]);

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

	const handleSignOut = async () => {
		localStorage.removeItem("authToken");
		dispatch({ type: USER_LOGOUT });
		navigateTo("/");
	};

	const handleUserUpdate = async (userObject, token) => {
		const apiResponse = await updateUser(userID, userObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			setAuthResponse(true);
			setOpenEditAddress(false);
			setOpenEditForm(false);
		}
	};

	const handleChefUpdate = async (chefObject, token) => {
		const apiResponse = await updateChef(userID, chefObject, token);
		if (apiResponse.code !== 200) {
			setAuthResponse(false);
		} else {
			setAuthResponse(true);
			setOpenEditAddress(false);
			setOpenEditForm(false);
		}
	};

	const handleUpdate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const addressStr = `${address}, ${city}, ${geoState}, ${zipcode}, ${
			aptNumber ? aptNumber : ""
		}`;

		const userObject = {
			firstName,
			lastName,
			email,
			address: addressStr.toUpperCase(),
			phone,
		};

		if (!user.isChef) {
			handleUserUpdate(userObject, token);
		} else {
			handleChefUpdate(userObject, token);
		}
	};

	return (
		<div className="bg-gray-100 w-full h-full min-h-screen">
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
					authResponse={authResponse}
					setAuthResponse={setAuthResponse}
				/>
			)}
		</div>
	);
};

export default Profile;
