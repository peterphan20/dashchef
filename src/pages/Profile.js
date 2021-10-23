import { useState } from "react";
import { useHistory } from "react-router";
import FormInputField from "../atoms/FormInputField";
import defaultAvatar from "../assets/default-avatar.jpg";
import { updateUser } from "../api/usersAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authResponse, setAuthResponse] = useState("");

	const history = useHistory();
	const user = useSelector((state) => state.userReducer);
	console.log(user);

	const handleSignOut = async () => {
		localStorage.removeItem("authToken");
		history.push("/");
	};

	const handleUpdateUser = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const userObject = {
			firstname,
			lastname,
			email,
			password,
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
		<div className="flex flex-col justify-start items-center bg-gray-100 py-5 px-2 w-full h-full min-h-screen">
			<div className="w-32 h-32">
				<img src={defaultAvatar} alt="default avatar" className="rounded-full" />
			</div>
			<div className="pt-5">
				<button>Add a photo</button>
				<h1 className="text-2xl font-body font-semibold">Peter P.</h1>
			</div>
			<div className="-space-y-px px-5 pt-5 pb-5 my-8 border border-gray-300 rounded-md w-full h-full">
				<h1 className="text-center text-xl text-gray-900 font-headers pb-5">Edit Account</h1>
				<FormInputField
					htmlFor="firstname"
					text="firstname"
					type="text"
					placeholder="First Name"
					className="mb-1"
					value={firstname}
					changeHandler={(e) => setFirstname(e.target.value)}
				/>
				<FormInputField
					htmlFor="lastname"
					text="lastname"
					type="text"
					placeholder="Last Name"
					className="mb-1"
					value={lastname}
					changeHandler={(e) => setLastname(e.target.value)}
				/>
				<FormInputField
					htmlFor="phone"
					text="phone"
					type="text"
					placeholder="Phone Number"
					className="mb-1"
					value={phone}
					changeHandler={(e) => setPhone(e.target.value)}
				/>
				<FormInputField
					htmlFor="email-address"
					text="email"
					type="email"
					placeholder="Email Address"
					className="mb-1"
					value={email}
					changeHandler={(e) => setEmail(e.target.value)}
				/>
				<FormInputField
					htmlFor="password"
					text="password"
					type="text"
					placeholder="Password"
					className="mb-3"
					value={password}
					changeHandler={(e) => setPassword(e.target.value)}
				/>
				<button
					className="flex items-end bg-green-400 text-gray-100 text-base rounded-md py-1 px-6"
					onClick={handleUpdateUser}
				>
					Submit
				</button>
			</div>
			<div className="flex flex-col justify-center items-center text-gray-100 font-body w-full h-full">
				<Link
					to="/create-kitchen"
					className="flex justify-center items-center bg-green-400 text-lg rounded-md py-2 mb-2 w-full h-full"
				>
					Add a kitchen
				</Link>
				<button
					className="bg-red-600 text-lg rounded-md py-2 w-full h-full"
					onClick={handleSignOut}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Profile;
