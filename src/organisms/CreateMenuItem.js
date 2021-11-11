import { useState } from "react";
import { useSelector } from "react-redux";
import { createMenuItem } from "../api/MenuItemsAPI";
import MenuItemCreateForm from "../molecules/MenuItemCreateForm";

const CreateMenuItem = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [photoURL, setPhotoURL] = useState("");
	const [tags, setTags] = useState([]);

	const user = useSelector((state) => state.userReducer);

	const handleCreateMenuItem = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const menuItemObject = {
			name,
			id: user.kitchenID,
			description,
			price,
			photoURL,
			tags,
		};

		const apiResponse = await createMenuItem(menuItemObject, token);
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
				tags={tags}
				setTags={setTags}
				handleCreateMenuItem={handleCreateMenuItem}
			/>
		</div>
	);
};

export default CreateMenuItem;
