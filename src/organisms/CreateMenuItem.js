import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createMenuItem } from "../api/MenuItemsAPI";
import MenuItemCreateForm from "../molecules/MenuItemCreateForm";

const CreateMenuItem = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [photoURL, setPhotoURL] = useState("");
	// const [showAnotherItemModal, setShowAnotherItemModal] = useState(false);
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
	const history = useHistory();

	const handleCreateMenuItem = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const menuItemObject = {
			name,
			id: user.kitchenID,
			description,
			price,
			photoURL,
			tags: listOfItems,
		};

		console.log("menu item object sent to api", menuItemObject);

		const apiResponse = await createMenuItem(menuItemObject, token);
		if (apiResponse.code === 201) {
			console.log("menu item created");
			history.push(`/kitchen/${user.kitchenID}`);
		} else {
			setAuthResponse(false);
			console.log("something went wrong here");
		}
	};

	return (
		<div className="flex flex-col justify-start bg-gray-100 py-2 px-4 w-full h-full min-h-screen">
			<MenuItemCreateForm
				name={name}
				setName={setName}
				description={description}
				setDescription={setDescription}
				price={price}
				setPrice={setPrice}
				photoURL={photoURL}
				setPhotoURL={setPhotoURL}
				listOfItems={listOfItems}
				setListOfItems={setListOfItems}
				handleCreateMenuItem={handleCreateMenuItem}
				authResponse={authResponse}
			/>
		</div>
	);
};

export default CreateMenuItem;
