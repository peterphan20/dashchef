import React from "react";

const ButtonFormSmall = ({ clickHandler, placeholder, className = "" }) => {
	return (
		<button
			className={`text-gray-100 text-sm rounded-md py-1 px-6 w-full ${className}`}
			onClick={clickHandler}
		>
			{placeholder}
		</button>
	);
};

export default ButtonFormSmall;
