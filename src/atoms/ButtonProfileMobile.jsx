import React from "react";

const ButtonProfileMobile = ({ clickHandler, placeholder, className = "" }) => {
	return (
		<button
			className={`flex justify-between items-center bg-gray-50 text-gray-900 text-lg ${className} border-b border-gray-300 py-4 px-3 w-full h-full`}
			onClick={clickHandler}
		>
			{placeholder}
		</button>
	);
};

export default ButtonProfileMobile;
