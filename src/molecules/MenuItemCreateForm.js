import React from "react";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
import FormInputField from "../atoms/FormInputField";
import ImageUploadSingle from "./ImageUploadSingle";

const MenuItemCreateForm = ({
	name,
	setName,
	price,
	setPrice,
	description,
	setDescription,
	photoURL,
	setPhotoURL,
	tags,
	setTags,
	handleCreateMenuItem,
}) => {
	return (
		<div>
			<h1 className="text-2xl font-headers text-center py-5">Add a menu item</h1>
			<FormInputField
				htmlFor="name"
				text="name"
				type="text"
				placeholder="Name"
				value={name}
				changeHandler={(e) => setName(e.target.value)}
			/>
			<FormInputField
				htmlFor="description"
				text="description"
				type="text"
				placeholder="Description"
				value={description}
				changeHandler={(e) => setDescription(e.target.value)}
			/>
			<FormInputField
				htmlFor="price"
				text="price"
				type="number"
				placeholder="Price"
				value={price}
				changeHandler={(e) => setPrice(e.target.value)}
			/>
			<ImageUploadSingle
				value={photoURL}
				changeHandler={(e) => setPhotoURL(e.target.value)}
				clickhandler={setPhotoURL}
			/>
			<ButtonFormSmall
				placeholder="Create Item"
				className="bg-green-500 mt-5"
				clickHandler={handleCreateMenuItem}
			/>
		</div>
	);
};

export default MenuItemCreateForm;
