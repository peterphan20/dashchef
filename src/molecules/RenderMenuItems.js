import React from "react";
import { useSelector } from "react-redux";

const RenderMenuItems = ({ className }) => {
	const menuItems = useSelector((state) => state.menuItemsReducer);

	const renderedMenuItems = menuItems.map((menuItem) => {
		return (
			<div
				className={`flex flex-col justify-center items-start text-sm font-body border-b border-gray-300 py-3 w-full h-full ${className}`}
				key={menuItem.itemID}
			>
				<p className="text-base font-bold">{menuItem.itemName}</p>
				<p className="overflow-clip">{menuItem.itemDescription}</p>
				<p>{menuItem.itemPrice}</p>
				<img src={menuItem.photoURL} alt="soup" />
			</div>
		);
	});

	return <div className="flex flex-col justify-center items-start">{renderedMenuItems}</div>;
};

export default RenderMenuItems;
