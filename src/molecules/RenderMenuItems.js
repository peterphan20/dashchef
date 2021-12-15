import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CART_ADD } from "../constants";

const RenderMenuItems = ({ className }) => {
	const [itemQuantities, setItemQuantities] = useState({});
	const menuItems = useSelector((state) => state.menuItemsReducer);
	const user = useSelector((state) => state.userReducer);
	const kitchen = useSelector((state) => state.selectedKitchenReducer);
	const dispatch = useDispatch();

	const incrementQuantity = (itemID) => {
		const newItemQuantities = { ...itemQuantities };
		if (itemQuantities[itemID]) {
			newItemQuantities[itemID]++;
		} else {
			newItemQuantities[itemID] = 1;
		}
		setItemQuantities(newItemQuantities);
	};

	const decrementQuantity = (itemID) => {
		const newItemQuantities = { ...itemQuantities };
		if (!itemQuantities[itemID] || itemQuantities[itemID] < 1) return;
		newItemQuantities[itemID]--;
		setItemQuantities(newItemQuantities);
	};

	const addToCart = (itemID) => {
		if (itemQuantities[itemID] < 1 || !itemQuantities[itemID]) {
			//TODO: post to user to change quantity
			return;
		}
		const payload = {
			itemID,
			quantity: itemQuantities[itemID],
		};
		dispatch({ type: CART_ADD, payload });
	};

	const renderedMenuItems = menuItems.map((menuItem, idx) => {
		return (
			<div
				className={`flex flex-col text-sm font-body border-b border-gray-300 py-1 w-full h-full ${className}`}
				key={menuItem.itemID}
			>
				<div className="flex justify-between items-centerp b-3">
					<div className="flex flex-col">
						<p className="text-base font-bold pb-1">{menuItem.itemName}</p>
						<p className="text-sm text-gray-700 overflow-clip pb-1">{menuItem.itemDescription}</p>
						<p className="text-sm">${menuItem.itemPrice}</p>
					</div>
					<div className="flex items-center w-28 h-28">
						<img src={menuItem.itemPhotoPrimaryURL} alt={menuItem.itemName} />
					</div>
				</div>
				<div className="flex justify-between items-center pb-2">
					<div className="flex justify-center items-center gap-2">
						<button
							className="flex justify-center items-center bg-gray-200 text-gray-500 rounded-full w-7 h-7"
							onClick={() => decrementQuantity(menuItem.itemID)}
						>
							<i className="fas fa-minus"></i>
						</button>
						<div>
							{!itemQuantities[menuItem.itemID] ? <p>0</p> : itemQuantities[menuItem.itemID]}
						</div>
						<button
							className="flex justify-center items-center bg-gray-400 text-gray-300 rounded-full w-7 h-7"
							onClick={() => incrementQuantity(menuItem.itemID)}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>
					<button
						className="flex items-end bg-red-600 text-gray-100 text-sm rounded-md py-2 px-4 disabled:bg-gray-300"
						onClick={() => addToCart(menuItem.itemID)}
						disabled={!itemQuantities[menuItem.itemID] || itemQuantities[menuItem.itemID] < 1}
					>
						Add to Cart
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="flex flex-col justify-center items-start">
			{menuItems[0] ? (
				renderedMenuItems
			) : user.kitchenID === kitchen.id ? (
				<Link to="/create/menu-item" className="text-blue-700 font-body text-sm py-2 mt-2 mb-6">
					Create Menu Item
				</Link>
			) : (
				<p className="font-body text-sm pt-2 pb-8">No menu item</p>
			)}
		</div>
	);
};

export default RenderMenuItems;
