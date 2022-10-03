import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateMenuItemImage } from "../api/MenuItemsAPI";
import ButtonProfileDesktop from "../atoms/ButtonProfileDesktop";

const ImageUploadMenuItem = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const [authResponse, setAuthResponse] = useState(null);
	const user = useSelector((state) => state.userReducer);
	const { menuItemID } = useParams();
	const navigateTo = useNavigate();

	const fileInputHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setFileIsSelected(true);
	};

	const clearSelectedFile = () => {
		setSelectedFile();
		setFileIsSelected(false);
	};

	const handleItemImageUpdate = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const formData = new FormData();
		formData.append("file", selectedFile);

		const apiResponse = await updateMenuItemImage(menuItemID, formData, token);
		if (apiResponse.status !== 204) {
			setAuthResponse(false);
		} else {
			navigateTo(`/kitchen/${user.kitchenID}`);
		}
	};

	return (
		<div className="bg-gray-100 py-10 w-full h-full min-h-screen">
			<div className="grid grid-cols-6 place-items-center bg-gray-200 border border-gray-300 p-10 max-w-2xl mx-auto">
				<h1 className="col-span-6 font-headers font-bold mb-1 text-2xl">UPLOAD FILES</h1>
				<p className="col-span-6 font-body text-sm mb-5">Want to update your kitchen's avatar?</p>
				<div
					className={`col-span-6 bg-gray-50 text-gray-900 rounded-md mt-1 px-6 pb-6 mb-5 border-2 border-dashed w-full ${
						!fileIsSelected ? "border-gray-300 pt-5" : "border-green-400 pt-3"
					}`}
				>
					{selectedFile ? (
						<button className="text-gray-400 pb-2" onClick={clearSelectedFile}>
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
				<ButtonProfileDesktop
					placeholder="Update!"
					className="col-span-2 place-self-start bg-green-400 "
					clickHandler={handleItemImageUpdate}
				/>
				{!authResponse ? (
					<span className="col-span-6 place-self-start text-red-600 mt-5">
						Something went wrong, please try again!
					</span>
				) : null}
			</div>
		</div>
	);
};

export default ImageUploadMenuItem;
