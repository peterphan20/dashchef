import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AspectRatioImg from "../molecules/AspectRatioImg";
import { CART_ADD } from "../constants";

const RenderMenuItems = ({ kitchen }) => {
	const [itemQuantities, setItemQuantities] = useState({});
	const menuItems = useSelector((state) => state.menuItemsReducer);
	const user = useSelector((state) => state.userReducer);
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
			return;
		}
		const payload = {
			id: itemID,
			kitchenID: kitchen.id,
			quantity: itemQuantities[itemID],
		};
		dispatch({ type: CART_ADD, payload });
	};

	const renderedMenuItems = menuItems.map((menuItem) => {
		return (
			<div
				key={menuItem.itemID}
				className="flex flex-col text-sm font-body border-b border-gray-300 py-1 w-full h-full"
			>
				{menuItem.itemID ? (
					<div>
						<div className="flex justify-between items-center py-3">
							<div className="flex flex-col gap-4">
								<p className="text-base font-bold mb-1">{menuItem.itemName}</p>
								<p className="text-sm text-gray-700 overflow-clip mb-1 pr-28">
									{menuItem.itemDescription}
								</p>
								<p className="text-sm pb-3">${menuItem.itemPrice}</p>
								<div className="flex justify-start items-center gap-2">
									<button
										className="flex justify-center items-center bg-gray-200 text-gray-500 p-2 w-5 h-5"
										onClick={() => decrementQuantity(menuItem.itemID)}
									>
										<i className="fa-solid fa-minus" />
									</button>
									<div>
										{!itemQuantities[menuItem.itemID] ? <p>0</p> : itemQuantities[menuItem.itemID]}
									</div>
									<button
										className="flex justify-center items-center bg-gray-400 text-gray-300 p-2 w-5 h-5"
										onClick={() => incrementQuantity(menuItem.itemID)}
									>
										<i className="fa-solid fa-plus" />
									</button>
								</div>
							</div>
							<div className="flex justify-center item-center">
								<AspectRatioImg
									outerClassName="w-36 h-36"
									src={menuItem.itemPhotoPrimaryURL}
									alt={menuItem.itemName}
								/>
								<button
									className="bg-red-600 text-gray-100 rounded-r-lg py-2 px-4 disabled:bg-gray-300"
									onClick={() => addToCart(menuItem.itemID)}
									disabled={!itemQuantities[menuItem.itemID] || itemQuantities[menuItem.itemID] < 1}
								>
									<i className="fa-solid fa-plus" />
								</button>
							</div>
						</div>
						<div>
							{user.kitchenID === kitchen.id ? (
								<Link to={`/edit/menu-item/${menuItem.itemID}`} className="text-blue-500 underline">
									Edit item
								</Link>
							) : null}
						</div>
					</div>
				) : user.kitchenID === kitchen.id ? (
					<Link
						to="/create/menu-item"
						className="text-blue-700 font-body text-sm py-2 mt-2 mb-6 w-fit"
					>
						Create Menu Item
					</Link>
				) : (
					<p className="font-body text-sm pt-2 pb-8">No menu item</p>
				)}
			</div>
		);
	});

	return <div className="flex flex-col justify-center items-start">{renderedMenuItems}</div>;
};

export default RenderMenuItems;
