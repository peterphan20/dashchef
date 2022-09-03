import React from "react";
import { useSelector } from "react-redux";

const OrderConfirmation = () => {
	const user = useSelector((state) => state.userReducer)

	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<div className="bg-red-200 w-full">
				<div className="flex flex-col justify-center items-center gap-5 py-20 w-1/3 md:max-w-5xl lg:max-w-7xl md:mx-auto">
					<h1 className="font-headers font-bold text-2xl">ORDER CONFIRMATION</h1>
					<span>{`${user.firstName}, thank you for your order!`}</span>
					<span className="text-center">{`Your order will be delivered to`}</span>
				</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;
