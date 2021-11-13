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
	fileInputHandler,
	handleCreateMenuItem,
	listOfItems,
	setListOfItems,
	authResponse,
}) => {
	const updateListOfItems = (itemIndex, updatedCheck) => {
		const updatedListOfItems = [...listOfItems];
		updatedListOfItems[itemIndex].isChecked = updatedCheck;
		setListOfItems(updatedListOfItems);
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
		<div>
			<h1 className="text-2xl font-headers text-center py-5">Add a menu item</h1>
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
			<ImageUploadSingle fileInputHandler={fileInputHandler} />
			{authResponse ? null : (
				<p className="text-red-600 text-base font-body text-center pt-5">
					Something has gone wrong, please try again
				</p>
			)}
			<ButtonFormSmall
				placeholder="Create item"
				className="bg-green-400 mt-5"
				clickHandler={handleCreateMenuItem}
			/>
		</div>
	);
};

export default MenuItemCreateForm;
