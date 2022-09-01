import React from "react";

const CheckoutFees = ({ placeholder, price }) => {
	return (
		<div className="flex justify-between items-center font-body">
			<span>{placeholder}</span>
			<span>{price}</span>
		</div>
	);
};

export default CheckoutFees;
