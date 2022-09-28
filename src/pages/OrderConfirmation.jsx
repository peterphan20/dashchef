import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMenuItem } from "../api/MenuItemsAPI";
import AspectRatioImg from "../molecules/AspectRatioImg";
import MockupOrderConfirmationItem from "../molecules/MockupOrderConfirmationItem";

const OrderConfirmation = () => {
	const user = useSelector((state) => state.userReducer);

	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<div className="flex flex-col justify-center py-20 max-w-3xl mx-auto w-full">
				<h1 className="font-headers font-bold text-4xl mb-2">ORDER RECEIVED</h1>
				<span className="mb-1">
					<strong>{user.firstName}</strong>, thank you for your order! We will contact you when your
					order is ready.
				</span>
				<span className="mb-16">
					Your order will be delivered to: <strong>{user.address}</strong>
				</span>
				<span className="pb-4 mb-10 border-b border-gray-300">
					Order ID: <strong>#52542367</strong>
				</span>
				<span className="font-headers font-bold text-xl mb-10">Order Summary :</span>
				<div className="bg-red-300 rounded py-1 px-10 mb-10">
					<MockupOrderConfirmationItem
						src="https://dashchef-dev.s3.amazonaws.com/77d25f4b25629eb16af6b14cad9201485bbfb821"
						alt="avacado toast"
						itemDescription="Artisan multigrain toast, house guacamole, pico de gallo, sprouts."
						itemName="Avacado Toast"
						itemPrice="$7.99"
					/>
					<MockupOrderConfirmationItem
						src="https://dashchef-dev.s3.amazonaws.com/d61aeb3a24befe038012d5b3cec4ff5187ea632c"
						alt="caesar salad"
						itemDescription="Baby kale, pico de gallo, tortilla strips, parmesan cheese, roasted corn, ceasar dressing."
						itemName="Caesar Salad"
						itemPrice="$14.99"
					/>
					<MockupOrderConfirmationItem
						src="https://dashchef-dev.s3.amazonaws.com/c549c2e1b1b683cdfdc43eb9731428e93495cdb0"
						alt="chicken alfredo"
						itemDescription="Penne pasta, broccoli, homemade alfredo with garlic bread."
						itemName="Chicken Alfredo"
						itemPrice="$12.99"
					/>
				</div>
				<div className="flex flex-col self-end font-body font-bold w-full">
					<div className="flex flex-col items-end gap-2 border-b border-gray-300 pb-3 mb-5">
						<span>Subtotal: $35.97</span>
						<span>Taxes: $2.34</span>
						<span>Deliver Fee: $3.50</span>
					</div>
					<span className="flex self-end">Total: $41.81</span>
				</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;
