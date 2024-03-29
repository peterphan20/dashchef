import { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutFees from "../molecules/CheckoutFees";
import LinkCartDesktop from "../atoms/LinkCartDesktop";

const CheckoutPanel = ({ cartItems }) => {
	const kitchen = useSelector((state) => state.selectedKitchenReducer);

	return (
		<div className="w-full">
			{cartItems[0] ? (
				<div>
					<div className="flex flex-col border-b border-gray-300 p-5">
						<span className="font-body text-sm">Your cart from:</span>
						<span className="font-headers font-bold text-lg pb-5">{kitchen.name}</span>
						<LinkCartDesktop link="/order-confirmation" placeholder="Place Order" />
					</div>
					<div className="flex flex-col gap-2 px-5 py-5 border-b border-gray-300">
						<CheckoutFees placeholder="Subtotal" price="$35.97" />
						<CheckoutFees placeholder="Regulatory Recovery Fee" price="$0.40" />
						<CheckoutFees placeholder="Delivery Fee" price="$3.50" />
						<CheckoutFees placeholder="Fees & Estimated Tax" price="$2.34" />
					</div>
					<div className="px-5 py-5 font-bold">
						<CheckoutFees placeholder="Total" price="$42.21" />
					</div>
				</div>
			) : (
				<div div className="flex flex-col items-center p-5">
					<i className="fa-solid fa-burger text-3xl text-gray-300 mb-1" />
					<p className="text-lg font-bold mb-1">Your cart is empty</p>
					<p className="text-sm mb-4">Add an item to get started</p>
					<div>
						<LinkCartDesktop
							link="/kitchens-list"
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
