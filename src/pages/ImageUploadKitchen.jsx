import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateKitchenAvatar } from "../api/kitchensAPI";
import ButtonFormSmall from "../atoms/ButtonFormSmall";

const ImageUploadKitchen = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const user = useSelector((state) => state.userReducer);
	const { kitchenID } = useParams();
	const navigateTo = useNavigate();

	const fileInputHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setFileIsSelected(true);
	};

	const clearSelectedFile = () => {
		setSelectedFile();
		setFileIsSelected(false);
	};

	const handleKitchenAvatarUpdate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const formData = new FormData();
		formData.append("file", selectedFile);

		const apiResponse = await updateKitchenAvatar(kitchenID, formData, token);
		console.log("api response===>", apiResponse);
		if (apiResponse.status !== 204) {
			console.log("Failed to update kitchen's avatar");
		} else {
			console.log("Kitchen's avatar successfully updated");
		}
	};
	return (
		<div className="bg-gray-100 py-10 w-full h-full min-h-screen">
			<div className="bg-gray-200 border border-gray-300 p-10 lg:max-w-2xl lg:mx-auto">
				<div className="flex flex-col justify-center items-center mb-5">
					<h1 className="font-headers font-bold mb-1 lg:text-2xl">UPLOAD FILES</h1>
					<p className="font-body lg:text-sm">Want to update your kitchen's avatar?</p>
				</div>
				<div
					className={`flex flex-col justify-center bg-gray-50 text-gray-900 rounded-md mt-1 px-6 pb-6 border-2 border-dashed ${
						!fileIsSelected ? "border-gray-300 pt-5" : "border-green-400 pt-3"
					}`}
				>
					{selectedFile ? (
						<button className="flex self-end text-gray-400 pb-2" onClick={clearSelectedFile}>
							<i className="fa-solid fa-xmark" />
						</button>
					) : null}
					<div className="space-y-1 text-center">
						<i className="fa-solid fa-image text-4xl text-gray-400" />
						<div className="text-sm text-gray-600">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-blue-500"
							>
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									accept=".jpg,.jpeg,.png"
									className="sr-only"
									onChange={fileInputHandler}
								/>
							</label>
						</div>
						<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
					</div>
				</div>
				<ButtonFormSmall
					placeholder="Update!"
					className="bg-green-400 lg:text-small lg:py-2 lg:mt-8"
					clickHandler={handleKitchenAvatarUpdate}
				/>
			</div>
		</div>
	);
};

export default ImageUploadKitchen;
