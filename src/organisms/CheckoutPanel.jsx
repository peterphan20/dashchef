import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKitchen } from "../api/kitchensAPI";
import { MENU_ITEMS_LOAD, SELECTED_KITCHEN_LOAD } from "../constants";
import CheckoutFees from "../atoms/CheckoutFees";
import LinkCartDesktop from "../atoms/LinkCartDesktop";

const CheckoutPanel = () => {
	const [displayCartInfo, setDisplayCartInfo] = useState(false);
	const [subtotal, setSubtotal] = useState(0);
	const [total, setTotoal] = useState(0);
	const [tip, setTip] = useState(0);

	const dispatch = useDispatch();
	const kitchen = useSelector((state) => state.selectedKitchenReducer);
	const cart = useSelector((state) => state.cartReducer);

	useEffect(() => {
		async function fetchKitchen() {
			const data = await getKitchen(cart[0].kitchenID);
			if (!data || !data.rows) {
				setDisplayCartInfo(false);
			} else {
				setDisplayCartInfo(true);
				const kitchenData = data.rows[0];
				const menuItemData = data.rows[0].menuitems;

				const payload = {
					id: kitchenData.id,
					address: kitchenData.address,
					avatarURL: kitchenData.avatarURL,
					chefFirstName: kitchenData.chefFirstName,
					chefLastName: kitchenData.chefLastName,
					createdAt: kitchenData.createdAt,
					email: kitchenData.email,
					name: kitchenData.name,
					phone: kitchenData.phone,
				};

				dispatch({ type: MENU_ITEMS_LOAD, payload: menuItemData });
				dispatch({ type: SELECTED_KITCHEN_LOAD, payload });
			}
		}
		fetchKitchen();
	}, [cart]);

	return (
		<div className="w-full h-full">
			{displayCartInfo ? (
				<div>
					<div className="flex flex-col border-b border-gray-300 p-5">
						<span className="font-body text-sm">Your cart from:</span>
						<span className="font-headers font-bold text-lg pb-5">{kitchen.name}</span>
						<LinkCartDesktop link="/order-confirmation" placeholder="Place Order" />
					</div>
					<div className="flex flex-col gap-2 px-5 py-5 border-b border-gray-300">
						<CheckoutFees placeholder="Subtotal" price={`$${subtotal}`} />
						<CheckoutFees placeholder="Regulatory Recovery Fee" price="$0.40" />
						<CheckoutFees placeholder="Delivery Fee" price="$3.50" />
						<CheckoutFees placeholder="Fees & Estimated Tax" price="$3.00" />
					</div>
					<div className="px-5 py-5 font-bold">
						<CheckoutFees placeholder="Total" price={`$${total}`} />
					</div>
				</div>
			) : (
				<div div className="flex flex-col items-center p-5">
					<i className="fa-solid fa-burger text-3xl text-gray-300 mb-1" />
					<p className="text-lg font-bold mb-1">Your cart is empty</p>
					<p className="text-sm mb-4">Add an item to get started</p>
					<div>
						<LinkCartDesktop
							link="/kitchens/all"
							placeholder="Browse kitchens"
							clickHandler={() => setIsCartOpen(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckoutPanel;
