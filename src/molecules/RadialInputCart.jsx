import React from "react";

const RadialInputCart = ({ htmlFor, radialName, value, changeHandler, placeholder }) => {
	return (
		<div className="flex items-center">
			<input
				id={htmlFor}
				name={radialName}
				type="radio"
				value={value}
				onChange={changeHandler}
				className="focus:ring-red-400 h-4 w-4 text-red-600 border-gray-300"
			/>
			<label htmlFor={htmlFor} className="ml-3 block text-base font-body text-gray-900">
				{placeholder}
			</label>
		</div>
	);
};

export default RadialInputCart;
