import { useState } from "react";
import { useSelector } from "react-redux";
import { createMenuItem } from "../api/MenuItemsAPI";
import ImageUploadSingle from "../molecules/ImageUploadSingle";
import ModalCreateAnotherItem from "../molecules/ModalCreateAnotherItem";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
import FormInputField from "../atoms/FormInputField";

const CreateMenuItem = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [selectedFile, setSelectedFile] = useState();
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const [showCreateAnotherItemModal, setShowCreateAnotherItemModal] = useState(false);
	const [authResponse, setAuthResponse] = useState(true);
	const [listOfItems, setListOfItems] = useState([
		{
			tag: "Lactose Free",
			isChecked: false,
		},
		{
			tag: "Gluten Free",
			isChecked: false,
		},
		{
			tag: "Vegetarian",
			isChecked: false,
		},
		{
			tag: "Vegan",
			isChecked: false,
		},
		{
			tag: "Food Allergy",
			isChecked: false,
		},
	]);
	const user = useSelector((state) => state.userReducer);

	const handleCreateMenuItem = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const formData = new FormData();
		formData.append("name", name);
		formData.append("id", user.kitchenID);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("file", selectedFile);
		// formData.append(
		// 	"tags",
		// 	listOfItems.map((item) => item.tag)
		// );

		const apiResponse = await createMenuItem(formData, token);
		console.log("api reponse", apiResponse);
		if (apiResponse.code !== 201) {
			console.log("something went wrong here");
			setAuthResponse(false);
		} else {
			console.log("menu item created");
			setShowCreateAnotherItemModal(true);
		}
	};

	const fileInputHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setFileIsSelected(true);
	};

	const clearSelectedFile = () => {
		setSelectedFile();
		setFileIsSelected(false);
	};

	const updateListOfItems = (itemIndex, updatedCheck) => {
		const updatedListOfItems = [...listOfItems];
		updatedListOfItems[itemIndex].isChecked = updatedCheck;
		setListOfItems(updatedListOfItems);
		console.log(listOfItems);
	};

	const renderedListOfItems = listOfItems.map((item, index) => (
		<div key={index} className="flex justify-start items-center gap-2 mb-1">
			<input
				id={item.tag}
				type="checkbox"
				checked={item.isChecked}
				onChange={() => updateListOfItems(index, !item.isChecked)}
			/>
			<label htmlFor={item.tag} className="block text-sm font-medium text-gray-900">
				{item.tag}
			</label>
		</div>
	));

	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 py-2 px-4 w-full h-full min-h-screen lg:justify-center lg:py-14">
			{showCreateAnotherItemModal ? (
				<ModalCreateAnotherItem
					modalHandler={setShowCreateAnotherItemModal}
					setShowCreateAnotherItemModal={setShowCreateAnotherItemModal}
				/>
			) : null}
			<div className="w-full h-full lg:bg-gray-200 lg:border lg:border-gray-300 lg:py-10 lg:px-16 lg:max-w-2xl lg:w-1/4 xl:w-1/3 lg:mx-auto">
				<h1 className="text-2xl font-headers text-center py-6 lg:text-3xl">Create a menu item</h1>
				<FormInputField
					htmlFor="name"
					text="name"
					type="text"
					placeholder="Item Name"
					value={name}
					changeHandler={(e) => setName(e.target.value)}
				/>
				<FormInputField
					htmlFor="price"
					text="price"
					type="number"
					placeholder="Price"
					className="max-w-max"
					value={price}
					changeHandler={(e) => setPrice(e.target.value)}
				/>
				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						id="description"
						className="relative block appearance-none text-gray-900 bg-gray-50 rounded-md rounded-none border border-gray-300 resize-none placeholder-gray-500 px-3 py-2 mb-5 w-full max-w-9xl h-28 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex flex-col justify-center items-start mb-5">
					<h1 className="block text-base font-medium text-gray-900 mb-2">Dietary Restrictions :</h1>
					{renderedListOfItems}
				</div>
				<h1 className="block text-sm font-medium text-gray-700 mb-2">Upload an image</h1>
				<ImageUploadSingle
					fileInputHandler={fileInputHandler}
					fileIsSelected={fileIsSelected}
					selectedFile={selectedFile}
					clearSelectedFile={clearSelectedFile}
				/>
				{authResponse ? null : (
					<p className="text-red-600 text-base font-body text-center pt-5">
						Something has gone wrong, please try again
					</p>
				)}
				<ButtonFormSmall
					placeholder="Create item"
					className="bg-green-400 mt-5 mb-10 lg:text-lg lg:py-2 lg:mt-8"
					clickHandler={handleCreateMenuItem}
				/>
			</div>
		</div>
	);
};

export default CreateMenuItem;
