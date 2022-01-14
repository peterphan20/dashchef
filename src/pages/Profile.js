import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser, validateToken } from "../api/usersAPI";
import { getChef } from "../api/chefsAPI";
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
	const [authResponse, setAuthResponse] = useState(null);

	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		window.scrollTo(0, 0);
		async function getUserData() {
			const token = localStorage.getItem("authToken");
			const isChef = localStorage.getItem("isChef");
			if (!token) {
				history.push("/");
			} else {
				const apiResponse = await validateToken(token);
				if (!apiResponse.id) return;
				if (isChef === "0") {
					const userApiResponse = await getUser(apiResponse.id);
					const userData = userApiResponse.rows[0];
					console.log("address", userData.address);
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
					console.log("address", chefData.address);
					setFirstName(chefData.firstName);
					setLastName(chefData.lastName);
					setEmail(chefData.email);
					setPhone(chefData.phone);
					const splitAddress = chefData.address.split(", ");
					console.log("split address", splitAddress);
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
