import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ImageUploadSingle from "../molecules/ImageUploadSingle";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
import { updateUserAvatar } from "../api/usersAPI";
import { updateChefAvatar } from "../api/chefsAPI";

const ImageUpload = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const user = useSelector((state) => state.userReducer);

	const { userID } = useParams();
	// const navigateTo = useNavigate();

	const fileInputHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setFileIsSelected(true);
	};

	const clearSelectedFile = () => {
		setSelectedFile();
		setFileIsSelected(false);
	};

	const handleUserUpdate = async (formData, token) => {
		const apiResponse = await updateUserAvatar(userID, formData, token);
		console.log("update user api response here", apiResponse);
		if (apiResponse.code !== 200) {
			console.log("user update unsuccessfully");
		} else {
			console.log("user update successful");
		}
	};

	const handleChefUpdate = async (formData, token) => {
		const apiResponse = await updateChefAvatar(userID, formData, token);
		console.log("update chef api response", apiResponse);
		if (apiResponse.code !== 200) {
			console.log("user update unsuccessfully");
		} else {
			// history.push(`/profile/${userID}`);
			console.log("user update successful");
		}
	};

	const handleUpdate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const formData = new FormData();
		formData.append("file", selectedFile);

		if (!user.isChef) {
			handleUserUpdate(formData, token);
			console.log("update user");
		} else {
			handleChefUpdate(formData, token);
			console.log("update chef");
		}
	};

	return (
		<div className="py-10 bg-gray-100 w-full h-full min-h-screen">
			<div className="bg-gray-200 border border-gray-300 p-10 lg:max-w-2xl lg:mx-auto">
				<div className="flex flex-col justify-center items-center mb-5">
					<h1 className="font-headers font-bold mb-1 lg:text-2xl">UPLOAD FILES</h1>
					<p className="font-body lg:text-sm">Want to upload an image?</p>
				</div>
				<ImageUploadSingle
					fileInputHandler={fileInputHandler}
					fileIsSelected={fileIsSelected}
					selectedFile={selectedFile}
					clearSelectedFile={clearSelectedFile}
				/>
				<ButtonFormSmall
					placeholder="Update!"
					className="bg-green-400 lg:text-lg lg:py-2 lg:mt-8"
					clickHandler={handleUpdate}
				/>
			</div>
		</div>
	);
};

export default ImageUpload;
