import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMenuItem } from "../api/MenuItemsAPI";
import ImageUploadMenuItem from "../organisms/ImageUploadMenuItem";
import ModalCreateAnotherItem from "../molecules/ModalCreateAnotherItem";
import FormInputField from "../molecules/FormInputField";
import ButtonFormSmall from "../atoms/ButtonFormSmall";

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
	const navigateTo = useNavigate();

	const fileInputHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setFileIsSelected(true);
	};

	const clearSelectedFile = () => {
		setSelectedFile();
		setFileIsSelected(false);
	};

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
		console.log("api response", apiResponse.status);
		if (apiResponse.status !== 201) {
			setAuthResponse(false);
		} else {
			setShowCreateAnotherItemModal(true);
		}
	};

	const updateListOfItems = (itemIndex, updatedCheck) => {
		const updatedListOfItems = [...listOfItems];
		updatedListOfItems[itemIndex].isChecked = updatedCheck;
		setListOfItems(updatedListOfItems);
	};

	const handleCreateAnotherMenuItem = () => {
		navigateTo("/create/menu-item");
		setShowCreateAnotherItemModal(false);
		setName("");
		setDescription("");
		setPrice(0);
		setSelectedFile();
		setFileIsSelected(false);
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
		<div className="bg-gray-100 py-2 px-4 w-full h-full min-h-screen lg:justify-center lg:py-14">
			{showCreateAnotherItemModal ? (
				<ModalCreateAnotherItem
					modalHandler={setShowCreateAnotherItemModal}
					handleCreateAnotherMenuItem={handleCreateAnotherMenuItem}
				/>
			) : null}
			<div className="grid grid-cols-4 w-full h-full lg:bg-gray-200 lg:border lg:border-gray-300 lg:py-10 lg:px-16 lg:max-w-2xl lg:w-1/4 xl:w-1/3 lg:mx-auto">
				<h1 className="col-span-4 text-2xl font-headers text-center py-6 lg:text-3xl">
					Create a menu item
				</h1>
				<FormInputField
					htmlFor="name"
					text="name"
					type="text"
					placeholder="Item Name"
					gridSpan="col-span-4"
					value={name}
					changeHandler={(e) => setName(e.target.value)}
				/>
				<FormInputField
					htmlFor="price"
					text="price"
					type="number"
					placeholder="Price"
					gridSpan="col-span-1"
					className="max-w-max"
					value={price}
					changeHandler={(e) => setPrice(e.target.value)}
				/>
				<div className="col-span-4">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						id="description"
						className="relative block appearance-none text-gray-900 bg-gray-50 rounded border border-gray-300 resize-none px-3 py-2 mb-5 w-full max-w-9xl h-28 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="col-span-4 mb-5">
					<h1 className="block text-base font-medium text-gray-900 mb-2">Dietary Restrictions :</h1>
					{renderedListOfItems}
				</div>
				<h1 className="block text-sm font-medium text-gray-700 mb-2">Upload an image</h1>
				<ImageUploadMenuItem
					fileInputHandler={fileInputHandler}
					fileIsSelected={fileIsSelected}
					selectedFile={selectedFile}
					clearSelectedFile={clearSelectedFile}
				/>
				<ButtonFormSmall
					placeholder="Create item"
					className="col-span-2 bg-green-400 text-sm mt-5 py-2 mt-8"
					clickHandler={handleCreateMenuItem}
				/>
				{authResponse ? null : (
					<p className="col-span-3 text-red-600 text-sm font-body mt-5 mb-10">
						Something went wrong, please try again.
					</p>
				)}
			</div>
		</div>
	);
};

export default CreateMenuItem;
