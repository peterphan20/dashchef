import React from "react";
import AspectRatioImg from "./AspectRatioImg";

const MockupOrderConfirmationItem = ({ src, alt, itemDescription, itemName, itemPrice }) => {
	return (
		<div className="grid grid-cols-4 gap-5 my-10">
			<div className="col-span-1">
				<AspectRatioImg className="rounded" outerClassName="h-32" src={src} alt={alt} />
			</div>
			<div className="col-span-3 flex flex-col gap-2 font-body text-sm">
				<span className="text-base font-bold">{itemName}</span>
				<span>{itemDescription}</span>
				<span>Qty: 1</span>
				<span>{itemPrice}</span>
			</div>
		</div>
	);
};

export default MockupOrderConfirmationItem;
