import { useState } from "react";
import { useSelector } from "react-redux";
import { createMenuItem } from "../api/MenuItemsAPI";
import MenuItemCreateForm from "../molecules/MenuItemCreateForm";
import ModalCreateAnotherItem from "../molecules/ModalCreateAnotherItem";

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

	return (
		<div className="flex flex-col justify-start items-center bg-gray-100 py-2 px-4 w-full h-full min-h-screen lg:justify-center lg:py-14">
			{showCreateAnotherItemModal ? (
				<ModalCreateAnotherItem
					modalHandler={setShowCreateAnotherItemModal}
					setShowCreateAnotherItemModal={setShowCreateAnotherItemModal}
				/>
			) : null}
			<MenuItemCreateForm
				name={name}
				setName={setName}
				description={description}
				setDescription={setDescription}
				price={price}
				setPrice={setPrice}
				selectedFile={selectedFile}
				fileIsSelected={fileIsSelected}
				fileInputHandler={fileInputHandler}
				clearSelectedFile={clearSelectedFile}
				handleCreateMenuItem={handleCreateMenuItem}
				authResponse={authResponse}
				listOfItems={listOfItems}
				setListOfItems={setListOfItems}
			/>
		</div>
	);
};

export default CreateMenuItem;
