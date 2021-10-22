import React from "react";
import defaultAvatar from "../assets/default-avatar.jpg";

const Profile = () => {
	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 py-5 px-2 w-full h-full min-h-screen">
			<div className="w-32 h-32">
				<img src={defaultAvatar} alt="default avatar" className="rounded-full" />
			</div>
			<div className="pt-5">
				<h1 className="text-2xl font-body font-semibold">Peter P.</h1>
			</div>
		</div>
	);
};

export default Profile;
