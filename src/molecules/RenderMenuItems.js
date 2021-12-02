import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RenderMenuItems = ({ className }) => {
	const [quantity, setQuantity] = useState(0);
	const menuItems = useSelector((state) => state.menuItemsReducer);
	const user = useSelector((state) => state.userReducer);
	const kitchen = useSelector((state) => state.selectedKitchenReducer);

	const renderedMenuItems = menuItems.map((menuItem) => {
		return (
			<div
				className={`flex flex-col text-sm font-body border-b border-gray-300 py-1 w-full h-full ${className}`}
				key={menuItem.itemID}
			>
				<div className="flex justify-between items-center pb-3">
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
							onClick={() => setQuantity(quantity - 1)}
						>
							<i className="fas fa-minus"></i>
						</button>
						<input
							type="number"
							className="bg-gray-50 p-1 w-7 h-6"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
						<button
							className="flex justify-center items-center bg-gray-400 text-gray-300 rounded-full w-7 h-7"
							onClick={() => setQuantity(quantity + 1)}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>
					<button className="flex items-end bg-red-600 text-gray-100 text-sm rounded-md py-2 px-4">
						Add to Cart
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="flex flex-col justify-center items-start">
			{menuItems.itemID ? (
				renderedMenuItems
			) : user.kitchenID === kitchen.id ? (
				<Link to="/create/menu-item" className="text-blue-700 font-body text-sm pt-2 pb-8">
					Create Menu Item
				</Link>
			) : (
				<p className="font-body text-sm pt-2 pb-8">No menu item</p>
			)}
		</div>
	);
};

export default RenderMenuItems;
