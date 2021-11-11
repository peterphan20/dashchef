import React from "react";
import ButtonFormSmall from "../atoms/ButtonFormSmall";
import FormInputField from "../atoms/FormInputField";

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
			<label
				htmlFor="file-upload"
				className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
			>
				<span>Upload a file</span>
				<input
					id="file-upload"
					name="file-upload"
					type="file"
					className="sr-only"
					value={photoURL}
					onChange={(e) => setPhotoURL(e.target.value)}
				/>
			</label>
			<ButtonFormSmall
				placeholder="Create Item"
				className="bg-green-600"
				clickHandler={handleCreateMenuItem}
			/>
		</div>
	);
};

export default MenuItemCreateForm;
